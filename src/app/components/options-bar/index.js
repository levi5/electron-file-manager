/* eslint-disable no-undef */
const htmlElements = require('../../../utils/Elements');
const settings = require('../../../utils/settings');
const userInterface = require('../../../utils/userInterface');



function update(hiddenFiles) {
	if (hiddenFiles) {
		htmlElements.Elements.optionsBar
			.buttons.viewHiddenFiles.classList.add('off');
	} else {
		htmlElements.Elements.optionsBar
			.buttons.viewHiddenFiles.classList.remove('off');
	}
}



async function toggleClassButtonHiddenFiles() {
	const hiddenFiles = await settings.getOptionHiddenFile();
	update(hiddenFiles);
}


function viewHiddenFiles() {
	let hiddenFiles;

	htmlElements.Elements.optionsBar.buttons.viewHiddenFiles.addEventListener('click', async () => {
		htmlElements.Elements.optionsBar.buttons.viewHiddenFiles.classList.toggle('off');
		const { value: className } = htmlElements
			.Elements.optionsBar.buttons
			.viewHiddenFiles.classList;

		const classList = className.split(/\s+/);

		if (classList.indexOf('off') !== -1) { hiddenFiles = true; } else { hiddenFiles = false; }

		const response = await settings.setOptionHiddenFile(hiddenFiles);
		if (!response) {
			const filepath = await userInterface.getCurrentDirectory();
			userInterface.loadDirectory(filepath);
		}
	});
	toggleClassButtonHiddenFiles();
}


module.exports = {
	viewHiddenFiles,
};
