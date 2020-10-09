const fs = require('fs').promises;
const osenv = require('osenv');
const path = require('path');



function getUsersHomeFolder() {
	return osenv.home();
}


async function getFilesInFolder(folderPath) {
	try {
		const files = await fs.readdir(folderPath).then((data) => {
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
		extname: path.extname(filePath) ? path.extname(filePath) : 'none',
	};

	let files;
	try {
		files = await fs.access(filePath);
	} catch (error) {
		files = undefined;
	}



	if (!files) {
		try {
			const stat = await fs.stat(filePath);

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
	await fs.rename(filename, newFilename, (err) => {
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



async function createFolderOrFile(directory, type) {
	let existFolder = true;

	let response = {
		error: true,
		message: 'error',
	};

	try {
		await fs.access(directory);
	} catch (error) {
		existFolder = false;
	}


	if (!existFolder) {
		if (type === 'directory') {
			await fs.mkdir(directory);
		} if (type === 'file') {
			await fs.writeFile(directory);
		}

		response = {
			error: false,
			message: 'Ok',
		};
		return response;
	}

	return response;
}

async function removeFolderOrFile(directory, type) {
	let existFolder = true;

	let response = {
		error: true,
		message: 'error',
	};

	try {
		await fs.access(directory);
	} catch (error) {
		existFolder = false;
	}


	if (!existFolder) {
		if (type === 'directory') {
			await fs.rmdir(directory, { recursive: true });
			response = {
				error: false,
				message: 'Ok',
			};
			return response;
		}
	}
	return response;
}


async function getFileDetails(filepath) {
	const data = await fs.stat(filepath);
	return data;
}

module.exports = {
	getUsersHomeFolder,
	getFilesInFolder,
	inspectAndDescribeFiles,
	getFileDetails,
	changingFilepath,
	rename,
	createFolderOrFile,
	removeFolderOrFile,
};
