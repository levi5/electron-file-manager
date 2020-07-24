/* eslint-disable no-undef */
const {
	openFolder, getSelectedFileDirectory, closeFolderOptions, closeModalRename,
} = require('../../../../utils/userInterface');

const { HtmlElements } = require('../../../../utils/Elements');


document.body.addEventListener('click', (e) => {
	if (e.target.parentNode.id !== 'modal-rename') {
		closeModalRename();
	}
	closeFolderOptions();
});

HtmlElements.mainArea.addEventListener('scroll', () => {
	closeFolderOptions();
	closeModalRename();
});

document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	openFolder(folderPath);
	closeFolderOptions();
});


document.getElementById('rename-file').addEventListener('click', () => {

});
