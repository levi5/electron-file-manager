const { resolve, basename } = require('path');

const fs = require('fs').promises;


// Function for writing the configuration file
async function writeConfigurationFile(data, settingPath = null) {
	let path;

	if (settingPath) { path = settingPath; } else { path = resolve(__dirname, '..', 'config', 'settings.json'); }

	if (data !== null || data !== undefined) {
		const json = JSON.stringify(data, null, 2);
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
		return [];
	} catch (error) {
		console.error('Error reading configuration file. ', error);
		return [];
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
		const {
			workspace,
			tags,
		} = config;

		if (workspace === workspaceName) {
			let count = 0;
			tags.map((tag) => {
				const { filePath } = tag;

				let tmpVar;
				if (filePath === dataTag.filePath) {
					tmpVar = dataTag;
					count += 1;
				} else {
					tmpVar = tag;
				}
				newTag.push(tmpVar);
				return true;
			});

			if (count === 0) { newTag.push(dataTag); }
			newData.push({
				...config,
				tags: newTag,
			});
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
		const { tags } = config;

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
		newData.push({
			...config, tags: newTag,
		});
		return true;
	});
	writeConfigurationFile(newData, settingsPath);
}




async function getOptionHiddenFile(workspaceName = 'main') {
	let response = true;
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settingData = await readConfigurationFile(settingsPath);

	if (settingData) {
		settingData.map((config) => {
			const { workspace, options } = config;
			if (workspace === workspaceName) {
				const { hiddenFile } = options;
				response = hiddenFile;
			}
			return true;
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
		return true;
	});
	const response = await writeConfigurationFile(data, settingsPath);
	return response;
}

// // Recent directories //

async function getRecentDirectories(workspaceName = 'main') {
	const recentDirectories = [];
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settings = await readConfigurationFile(settingsPath);

	settings.map((setting) => {
		const { workspace, menu } = setting;
		if (workspace === workspaceName) {
			const { recent } = menu;
			recent.map((directory) => {
				recentDirectories.push(directory);
				return true;
			});
		}
		return true;
	});

	return recentDirectories;
}


async function removeRecentDirectories(folderPath, filter, workspaceName = 'main') {
	const newSettings = [];
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settings = await readConfigurationFile(settingsPath);

	let recentDirectories = await getRecentDirectories();

	if (filter === 'all') {
		recentDirectories = [];
	} else if (filter === 'one') {
		recentDirectories = recentDirectories.filter((directory) => {
			if (directory.path !== folderPath) return directory;

			return false;
		});
	}

	settings.map((setting) => {
		const { workspace, menu } = setting;
		if (workspace === workspaceName) {
			newSettings.push({
				...setting,
				menu: {
					...menu,
					recent: recentDirectories,
				},
			});
		}
		return true;
	});
	await writeConfigurationFile(newSettings, settingsPath);
}



async function setRecentDirectories(folderPath, newType = 'directory', workspaceName = 'main') {
	const newDirectories = [];
	const currentDateTime = new Date().toLocaleString();
	const name = basename(folderPath);

	const defaultObj = {
		name,
		path: folderPath,
		type: newType,
		access: 1,
		accessDate: currentDateTime,
	};


	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settings = await readConfigurationFile(settingsPath);
	const newSettings = [];

	settings.map((setting) => {
		const { workspace, menu } = setting;

		if (workspace === workspaceName) {
			let count = 0;
			const { recent } = menu;

			if (recent.length >= 1) {
				recent.map((directory) => {
					const {
						path, type, access,
					} = directory;

					if (path === folderPath) {
						const increment = Number(access) + 1;
						newDirectories.push({
							name,
							path,
							type,
							access: increment,
							accessDate: currentDateTime,
						});
						count += 1;
					} else {
						newDirectories.push(directory);
					}
					return true;
				});

				if (count === 0) {
					newDirectories.push(defaultObj);
				}
			} else {
				newDirectories.push(defaultObj);
			}
		}

		newSettings.push({
			...setting,
			menu: {
				...menu,
				recent: newDirectories,
			},
		});
		return true;
	});
	await writeConfigurationFile(newSettings, settingsPath);
}


// left menu

async function setMenuOptions(data, flag, workspaceName = 'main') {
	const settingsPath = resolve(__dirname, '..', 'config', 'settings.json');
	const settings = await readConfigurationFile(settingsPath);

	let newDirectories = [];
	const newSettings = [];

	let obj;
	if (settings.length !== 0) {
		settings.map(async (setting) => {
			const { workspace, menu } = setting;
			if (workspace === workspaceName) {
				const { directories } = menu;

				if (flag.toUpperCase() !== 'LOAD') {
					data.map((dir) => {
						obj = dir;
						if (directories.length >= 1) {
							directories.map((it, index) => {
								if (flag.toUpperCase() === 'ADD') {
									if (it.path !== obj.path) {
										newDirectories.push(it);
									}
									if (directories.length === (index + 1)) {
										newDirectories.push(obj);
									}
								} else if (flag.toUpperCase() === 'DEL') {
									if (it.path !== obj.path) {
										if (it.edit) {
											newDirectories.push({ ...it, visible: true });
										} else {
											newDirectories.push(it);
										}
									}
								}
								return true;
							});
						} else {
							newDirectories.push({ ...obj, visible: true });
						}
						return true;
					});
				} else {
					console.log('load');
					newDirectories = directories;
				}


				newSettings.push({
					...setting,
					menu: {
						...menu,
						directories: newDirectories,
					},
				});
				console.log(newSettings);
			}
			return true;
		});
		console.log('gravar', newSettings);
		await writeConfigurationFile(newSettings, settingsPath);
		const Dir = newDirectories.filter((directory) => directory.visible === true);
		return Dir;
	}
	return [];
}




module.exports = {
	getTagConfig,
	getTagsConfig,
	saveTagConfig,
	changeTagData,
	getOptionHiddenFile,
	setOptionHiddenFile,

	getRecentDirectories,
	setRecentDirectories,
	removeRecentDirectories,

	setMenuOptions,
};
