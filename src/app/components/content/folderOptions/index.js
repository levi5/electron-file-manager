/* eslint-disable no-undef */
const { openFolder, getSelectedFileDirectory } = require('../../../../utils/userInterface');


const folderOptions = document.querySelector('#folder-options');

function closeFolderOptions() {
	folderOptions.classList.remove('on');
}


document.body.addEventListener('click', () => {
	closeFolderOptions();
});


document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	openFolder(folderPath);
	closeFolderOptions();
});
