/* eslint-disable no-undef */
const path = require('path');

const { Elements } = require('../../../../../utils/Elements');
const fileSystem = require('../../../../../utils/fileSystem');
const settings = require('../../../../../utils/settings');
const { loadMenuTags } = require('../../left-menu/index');


function openWindowRenameFiles(filename, filetype, filepath) {
	const modal = document.querySelector('#modal-rename');

	modal.classList.add('on');
	modal.querySelector('input[name=rename-file]').value = filename;
	modal.setAttribute('data-path', filepath);
	modal.setAttribute('data-type', filetype);
}


function closeWindowRenameFiles() {
	const modal = document.querySelector('#modal-rename');
	modal.classList.remove('on');
}




async function applyFilenameChange(filepath, newFilepath, filename) {
	const itens = [...Elements.mainArea.querySelectorAll('.item')];

	itens.map((item) => {
		const filePath = item.getAttribute('data-path');
		if (filePath === filepath) {
			const elementFilename = item.querySelector('.filename');
			const elementIcon = item.querySelector('.item-icon');
			elementFilename.textContent = filename;
			elementFilename.setAttribute('data-path', newFilepath);
			elementIcon.setAttribute('data-filepath', newFilepath);
			item.setAttribute('data-path', newFilepath);
		}
		return true;
	});
}

function setAttributeModal(filename = '', filepath = '', filetype = '') {
	Elements.menuFolderOptions.setAttribute('data-name', filename);
	Elements.menuFolderOptions.setAttribute('data-type', filetype);
	Elements.menuFolderOptions.setAttribute('data-path', filepath);
}

async function rename(f) {
	document.querySelector('#btn-modal-rename').addEventListener('click', async () => {
		const filepath = String(Elements.modalRename.getAttribute('data-path'));
		const filetype = String(Elements.modalRename.getAttribute('data-type'));
		const input = String(document.querySelector('#modal-rename input[name=rename-file]').value);

		let newFilepath;

		if (input) {
			newFilepath = fileSystem.changingFilepath(input, filepath, filetype);
			await fileSystem.rename(filepath, newFilepath);
			await applyFilenameChange(filepath, newFilepath, input);
			await settings.changeTagData(input, filepath, newFilepath, filetype);

			setAttributeModal(input, newFilepath, filetype);

			const previousDirectory = path.resolve(newFilepath, '..');
			const posScroll = Elements.mainArea.scrollTop;

			await f(previousDirectory);
			await loadMenuTags();
			Elements.mainArea.scrollTo(0, posScroll);
		}

		setAttributeModal();
		Elements.modalRename.classList.remove('on');
	});
}



module.exports = {
	openWindowRenameFiles,
	closeWindowRenameFiles,
	rename,
};
