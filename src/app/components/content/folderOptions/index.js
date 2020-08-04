/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');
const { loadDirectory } = require('../../../../utils/userInterface');
const { openWindowRenameFiles, closeWindowRenameFiles } = require('../modal/rename/index');
const { getSelectedFileDirectory } = require('../../tittleBar/index');
const { closeFolderOptions, closeMenuGlobal, menuGlobal } = require('./functions');



document.body.addEventListener('click', (e) => {
	if (e.target.parentNode.id === 'main-area') {
		closeWindowRenameFiles();
	}
	closeFolderOptions();
	closeMenuGlobal();
});


Elements.mainArea.addEventListener('scroll', () => {
	closeFolderOptions();
	closeMenuGlobal();
});


document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	loadDirectory(folderPath);
	closeFolderOptions();
	closeMenuGlobal();
});



document.getElementById('rename-file').addEventListener('click', () => {
	const filename = String(Elements.main.folder.menu.options.getAttribute('data-name'));
	const filetype = String(Elements.main.folder.menu.options.getAttribute('data-type'));
	const filepath = String(Elements.main.folder.menu.options.getAttribute('data-path'));

	openWindowRenameFiles(filename, filetype, filepath);
	closeFolderOptions();
});



document.querySelector('body').addEventListener('pointerdown', (e) => {
	if (e.buttons === 2) {
		if (e.target.id === 'main-area') {
			menuGlobal(e.clientX, e.clientY);
		}
	}
});
