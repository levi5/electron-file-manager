const { resolve } = require('path');
const fs = require('fs').promises;




// Function for writing the configuration file
async function writeConfigurationFile(data, settingPath = null) {
	let path;

	if (settingPath) { path = settingPath; } else { path = resolve(__dirname, '..', 'config', 'setting.json'); }

	if (data !== null || data !== undefined) {
		const json = JSON.stringify(data);
		await fs.writeFile(path, json).then((dataConfig) => dataConfig).catch((err) => {
			console.log(err);
		});
	}
}

// Function for reading the configuration file
async function readConfigurationFile(settingPath = null) {
	try {
		let path;
		if (settingPath) { path = settingPath; } else { path = resolve(__dirname, '..', 'config', 'setting.json'); }

		// console.log(path);
		const data = await fs.readFile(path, 'utf8').then((dataConfig) => dataConfig);
		const obj = JSON.parse(data);

		return obj;
	} catch (error) {
		console.error('Error reading configuration file. ', error);
		return null;
	}
}


async function getTagConfig(filePath, workspaceName = 'main') {
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settingData = await readConfigurationFile(settingsPath);

	let dataTag = null;

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
	return dataTag;
}




async function saveTagConfig(dataTag, workspaceName = 'main') {
	const newData = [];

	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');

	const settingData = await readConfigurationFile(settingsPath);

	settingData.map((config) => {
		const newTag = [];
		const { workspace, tags } = config;

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
					count = 0;
				}

				newTag.push(temp);
				return true;
			});


			if (count === 0) {
				newTag.push(dataTag);
			}


			newData.push({ workspace, tags: newTag });
		} else {
			newData.push(config);
		}
		return true;
	});

	writeConfigurationFile(newData, settingsPath);
}




module.exports = {
	saveTagConfig,
	getTagConfig,
};
