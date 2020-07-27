/* eslint-disable no-undef */
const settings = require('../../../utils/settings');
const userInterface = require('../../../utils/userInterface');

function update(hiddenFiles) {
	const viewHiddenFilesButton = document.querySelector('#view-hidden-files');
	if (hiddenFiles) {
		viewHiddenFilesButton.classList.add('off');
	} else {
		viewHiddenFilesButton.classList.remove('off');
	}
}

async function toggleClassButtonHiddenFiles() {
	const hiddenFile = await settings.getOptionHiddenFile();
	update(hiddenFile);
}

function viewHiddenFiles() {
	let hiddenFiles;
	const viewHiddenFilesButton = document.querySelector('#view-hidden-files');
	viewHiddenFilesButton.addEventListener('click', async () => {
		viewHiddenFilesButton.classList.toggle('off');
		const { value } = viewHiddenFilesButton.classList;

		if (value === 'off') {
			hiddenFiles = true;
		} else {
			hiddenFiles = false;
		}

		const response = await settings.setOptionHiddenFile(hiddenFiles);
		if (!response) {
			const filepath = await userInterface.getCurrentDirectory();
			userInterface.openFolder(filepath);
		}
	});
	toggleClassButtonHiddenFiles();
}


module.exports = {
	viewHiddenFiles,
};
