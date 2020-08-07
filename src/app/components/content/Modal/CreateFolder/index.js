
const path = require('path');
const { Elements } = require('../../../../../utils/Elements');
const { getCurrentDirectory } = require('../../../../../utils/userInterface');
const fileSystem = require('../../../../../utils/fileSystem');


const modal = Elements.modal.screen;
const createFolderScreen = Elements.modal.createFolder.screen;


function openWindowCreateFolder(filename, filetype, filepath) {
	modal.classList.add('on');
	createFolderScreen.classList.add('on');

	modal.querySelector('input[name=rename-file]').value = filename;
	modal.setAttribute('data-path', filepath);
	modal.setAttribute('data-type', filetype);
}


function closeWindowCreateFolder() {
	modal.classList.remove('on');
	createFolderScreen.classList.remove('on');
}


function createFolder(f) {
	Elements.modal.createFolder.buttons.create.addEventListener('click', async () => {
		const filetype = 'directory';
		const foldername = String(Elements.modal.createFolder.inputs.foldername.value);

		if (foldername) {
			const currentDirectory = getCurrentDirectory();
			const folderPath = path.join(currentDirectory, foldername);
			const { error, _message } = await fileSystem.createFolderOrFile(folderPath, filetype);
			if (!error) {
				const scrollBarPosition = Elements.mainArea.scrollTop;
				await f(currentDirectory);
				Elements.mainArea.scrollTo(0, scrollBarPosition);
			}
		}

		closeWindowCreateFolder();
	});
}

module.exports = {
	openWindowCreateFolder,
	closeWindowCreateFolder,
	createFolder,
};
