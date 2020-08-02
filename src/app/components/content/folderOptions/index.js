/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');
const { loadDirectory } = require('../../../../utils/userInterface');
const { openWindowRenameFiles, closeWindowRenameFiles } = require('../modal/rename/index');
const { getSelectedFileDirectory } = require('../../tittleBar/index');


function closeFolderOptions() {
	Elements.main.folder.menu.options.classList.remove('on');
}


document.body.addEventListener('click', (e) => {
	if (e.target.parentNode.id === 'main-area') {
		closeWindowRenameFiles();
	}
	closeFolderOptions();
});


Elements.mainArea.addEventListener('scroll', () => {
	closeFolderOptions();
});


document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getSelectedFileDirectory();
	loadDirectory(folderPath);
	closeFolderOptions();
});



document.getElementById('rename-file').addEventListener('click', () => {
	const filename = String(Elements.main.folder.menu.options.getAttribute('data-name'));
	const filetype = String(Elements.main.folder.menu.options.getAttribute('data-type'));
	const filepath = String(Elements.main.folder.menu.options.getAttribute('data-path'));

	openWindowRenameFiles(filename, filetype, filepath);
	closeFolderOptions();
});
