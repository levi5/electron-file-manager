/* eslint-disable no-undef */
const htmlElements = require('../../../utils/Elements');
const settings = require('../../../utils/settings');
const userInterface = require('../../../utils/userInterface');



function update(hiddenFiles) {
	if (hiddenFiles) {
		htmlElements.Elements.optionsBar
			.buttons.btnViewHiddenFiles.classList.add('off');
	} else {
		htmlElements.Elements.optionsBar
			.buttons.btnViewHiddenFiles.classList.remove('off');
	}
}



async function toggleClassButtonHiddenFiles() {
	const hiddenFiles = await settings.getOptionHiddenFile();
	update(hiddenFiles);
}


function viewHiddenFiles() {
	let hiddenFiles;

	htmlElements.Elements.optionsBar.buttons.btnViewHiddenFiles.addEventListener('click', async () => {
		htmlElements.Elements.optionsBar.buttons.btnViewHiddenFiles.classList.toggle('off');
		const { value: className } = htmlElements
			.Elements.optionsBar.buttons
			.btnViewHiddenFiles.classList;

		if (className === 'off') { hiddenFiles = true; } else { hiddenFiles = false; }

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
