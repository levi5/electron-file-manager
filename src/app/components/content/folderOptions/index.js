/* eslint-disable no-undef */
const { openFolder, getSelectedFileDirectory, closeFolderOptions } = require('../../../../utils/userInterface');
const { HtmlElements } = require('../../../../utils/Elements');

document.body.addEventListener('click', () => {
	closeFolderOptions();
});

HtmlElements.mainArea.addEventListener('scroll', () => {
	closeFolderOptions();
});

document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	openFolder(folderPath);
	closeFolderOptions();
});
