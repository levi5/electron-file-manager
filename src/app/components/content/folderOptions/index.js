/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');
const { loadDirectory } = require('../../../../utils/userInterface');
const { openWindowRenameFiles, closeWindowRenameFiles } = require('../Modal/Rename/index');
const { openWindowCreateFolder, closeWindowCreateFolder } = require('../Modal/CreateFolder/index');
const { getSelectedFileDirectory } = require('../../tittleBar/index');
const { closeFolderOptions, closeMenuGlobal, menuGlobal } = require('./functions');


function removeSelection() {
	const itens = [...document.querySelectorAll('.item')];
	itens.map((item) => {
		item.classList.remove('selected');
		return true;
	});
}


document.body.addEventListener('click', (e) => {
	console.log(e.target.parentNode.id);
	if (e.target.parentNode.id === 'items-content') {
		closeWindowRenameFiles();
		closeWindowCreateFolder();
	}
	closeFolderOptions();
	closeMenuGlobal();
});


Elements.main.content.screenItems.addEventListener('scroll', () => {
	closeFolderOptions();
	closeMenuGlobal();
});



document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	loadDirectory(folderPath);
	closeFolderOptions();
	closeMenuGlobal();
});



Elements.main.content.folder.menu.buttons.rename.addEventListener('click', () => {
	const filename = String(Elements.main.content.folder.menu.options.getAttribute('data-name'));
	const filetype = String(Elements.main.content.folder.menu.options.getAttribute('data-type'));
	const filepath = String(Elements.main.content.folder.menu.options.getAttribute('data-path'));

	openWindowRenameFiles(filename, filetype, filepath);
	closeFolderOptions();
});



document.querySelector('body').addEventListener('pointerdown', (e) => {
	if (e.buttons === 2) {
		if (e.target.id === 'items-content') {
			removeSelection();
			menuGlobal(e.clientX, e.clientY);
		}
	}
});




Elements.main.content.global.menu.buttons.createFolder.addEventListener('click', () => {
	const filename = String(Elements.main.content.folder.menu.options.getAttribute('data-name'));
	const filetype = String(Elements.main.content.folder.menu.options.getAttribute('data-type'));
	const filepath = String(Elements.main.content.folder.menu.options.getAttribute('data-path'));

	openWindowCreateFolder(filename, filetype, filepath);
	closeFolderOptions();
});
