const async = require('async');
const fs = require('fs');
const osenv = require('osenv');
const path = require('path');

const fsPromises = fs.promises;

function getUsersHomeFolder() {
	return osenv.home();
}


function getFilesInFolder(folderPath, cb) {
	fs.readdir(folderPath, cb);
}



function inspectAndDescribeFile(filePath, cb) {
	const result = {
		file: path.basename(filePath),
		path: filePath,
		type: '',
		extname: path.extname(filePath) ? path.extname(filePath) : 'directory',
	};


	fs.access(filePath, (err, _data) => {
		if (!err) {
			fs.stat(filePath, { recursive: true }, (err2, stat) => {
				if (err2) {
					cb(err2);
				} else {
					if (stat.isFile()) {
						result.type = 'file';
					}
					if (stat.isDirectory()) {
						result.type = 'directory';
					}
					cb(err2, result);
				}
			});
		} else {
			cb(null, result);
		}
	});
}


function inspectAndDescribeFiles(folderPath, files, cb) {
	async.map(files, (file, asyncCb) => {
		const resolvedFilePath = path.resolve(folderPath, file);
		inspectAndDescribeFile(resolvedFilePath, asyncCb);
	}, cb);
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
	rename,
};
