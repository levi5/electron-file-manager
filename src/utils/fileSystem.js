const fs = require('fs');
const fsP = require('fs').promises;
const osenv = require('osenv');
const path = require('path');

const fsPromises = fs.promises;

function getUsersHomeFolder() {
	return osenv.home();
}


async function getFilesInFolder(folderPath) {
	try {
		const files = await fsP.readdir(folderPath).then((data) => {
			try {
				return {
					files: data,
					error: null,
				};
			} catch (err) {
				return {
					files: null,
					error: err,
				};
			}
		});

		return files;
	} catch (error) {
		return {
			files: null,
			error,
		};
	}
}



async function inspectAndDescribeFile(filePath) {
	const result = {
		file: path.basename(filePath),
		path: filePath,
		type: '',
		extname: path.extname(filePath) ? path.extname(filePath) : 'directory',
	};

	let files;
	try {
		files = await fsP.access(filePath);
	} catch (error) {
		files = undefined;
	}



	if (!files) {
		try {
			const stat = await fsP.stat(filePath);

			if (stat.isFile()) {
				result.type = 'file';
			}
			if (stat.isDirectory()) {
				result.type = 'directory';
			}
		} catch (error) {
			return result;
		}
	}

	return result;
}


async function inspectAndDescribeFiles(folderPath, files) {
	const describeFiles = await files.map(async (file) => {
		const resolvedFilePath = await path.resolve(folderPath, file);
		const response = await inspectAndDescribeFile(resolvedFilePath).then((data) => data);

		return response;
	});

	const values = await Promise.allSettled(describeFiles);

	const fileData = values.map((item) => {
		const { value } = item;
		return value;
	});
	return fileData;
}

function changingFilepath(filename, filepath, filetype) {
	let newFilepath = 'sem nome';

	if (filetype === 'file') {
		newFilepath = path.join(path.dirname(filepath), filename);
	} else {
		newFilepath = path.join(path.resolve(filepath, '..'), filename);
	}
	return newFilepath;
}

async function rename(filename, newFilename) {
	await fsPromises.rename(filename, newFilename, (err) => {
		if (err) {
			return {
				success: false,
				error: err,
			};
		}
		return {
			success: true,
			error: err,
		};
	});
}


module.exports = {
	getUsersHomeFolder,
	getFilesInFolder,
	inspectAndDescribeFiles,
	changingFilepath,
	rename,
};
