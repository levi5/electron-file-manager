const { resolve } = require('path');
const fs = require('fs').promises;




// Function for writing the configuration file
async function writeConfigurationFile(data, settingPath = null) {
	let path;

	if (settingPath) { path = settingPath; } else { path = resolve(__dirname, '..', 'config', 'settings.json'); }

	if (data !== null || data !== undefined) {
		const json = JSON.stringify(data);
		await fs.writeFile(path, json).then((dataConfig) => dataConfig).catch((err) => ({
			data: null,
			error: err,
		}));
	}
}

// Function for reading the configuration file
async function readConfigurationFile(settingPath = '') {
	try {
		let path;
		if (settingPath) { path = settingPath; } else { path = resolve(__dirname, '..', 'config', 'settings.json'); }


		const data = await fs.readFile(path, 'utf8').then((dataConfig) => dataConfig);



		if (data) {
			const obj = JSON.parse(data);
			return obj;
		}
		return null;
	} catch (error) {
		console.error('Error reading configuration file. ', error);
		return null;
	}
}


async function getTagConfig(filePath, workspaceName = 'main') {
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settingData = await readConfigurationFile(settingsPath);

	let dataTag = null;
	if (settingData) {
		settingData.map((config) => {
			const { workspace, tags } = config;

			if (workspace === workspaceName) {
				tags.map((file) => {
					if (filePath === file.filePath) {
						dataTag = file;
					}
					return true;
				});
			}
			return true;
		});
	}
	return dataTag;
}



async function getTagsConfig(workspaceName = 'main') {
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settingData = await readConfigurationFile(settingsPath);

	const arrayTags = [];

	settingData.map((config) => {
		const { workspace, tags } = config;

		if (workspace === workspaceName) {
			tags.map((tag) => {
				arrayTags.push(tag);
				return true;
			});
		}
		return true;
	});
	return arrayTags;
}




async function saveTagConfig(dataTag, workspaceName = 'main') {
	const newData = [];

	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');

	const settingData = await readConfigurationFile(settingsPath);

	settingData.map((config) => {
		const newTag = [];
		const { workspace, options, tags } = config;

		if (workspace === workspaceName) {
			let count = 0;
			tags.map((file) => {
				const { filePath } = file;

				let temp;
				if (filePath === dataTag.filePath) {
					temp = dataTag;
					count += 1;
				} else {
					temp = file;
				}

				newTag.push(temp);
				return true;
			});


			if (count === 0) {
				newTag.push(dataTag);
			}


			newData.push({ workspace, options, tags: newTag });
		} else {
			newData.push(config);
		}
		return true;
	});

	writeConfigurationFile(newData, settingsPath);
}


async function changeTagData(filename, filepath, newFilepath, filetype) {
	const newData = [];
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');

	const settingData = await readConfigurationFile(settingsPath);
	settingData.map((config) => {
		const newTag = [];
		const { workspace, options, tags } = config;

		tags.map((tag) => {
			const { filePath } = tag;

			if (filePath === filepath) {
				newTag.push({
					...tag, filename, filePath: newFilepath, filetype,
				});
			} else {
				newTag.push(tag);
			}
			return true;
		});
		newData.push({ workspace, options, tags: newTag });
		return true;
	});
	writeConfigurationFile(newData, settingsPath);
}




async function getOptionHiddenFile(workspaceName = 'main') {
	let response = false;
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');

	const settingData = await readConfigurationFile(settingsPath);

	if (settingData) {
		settingData.map((config) => {
			const { workspace, options } = config;
			if (workspace === workspaceName) {
				const { hiddenFile } = options;
				response = hiddenFile;
			}
		});
	}
	return response;
}




async function setOptionHiddenFile(value, workspaceName = 'main') {
	const data = [];
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settingData = await readConfigurationFile(settingsPath);

	settingData.map((config) => {
		const { workspace, options } = config;
		if (workspace === workspaceName) {
			const newData = {
				...config,
				options: {
					...options,
					hiddenFile: value,
				},
			};
			data.push(newData);
		} else {
			data.push(config);
		}
	});
	const response = await writeConfigurationFile(data, settingsPath);
	return response;
}


module.exports = {
	getTagConfig,
	getTagsConfig,
	saveTagConfig,
	changeTagData,
	getOptionHiddenFile,
	setOptionHiddenFile,
};
