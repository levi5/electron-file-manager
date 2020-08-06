/* eslint-disable no-undef */
const path = require('path');

const { Elements } = require('../../../../../utils/Elements');
const fileSystem = require('../../../../../utils/fileSystem');
const settings = require('../../../../../utils/settings');
const { loadMenuTags } = require('../../left-menu/index');


const modal = Elements.modal.screen;
const renameScreen = Elements.modal.rename.screen;

function openWindowRenameFiles(filename, filetype, filepath) {
	modal.classList.add('on');
	renameScreen.classList.add('on');

	modal.querySelector('input[name=rename-file]').value = filename;
	modal.setAttribute('data-path', filepath);
	modal.setAttribute('data-type', filetype);
}


function closeWindowRenameFiles() {
	modal.classList.remove('on');
	renameScreen.classList.remove('on');
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
	Elements.main.folder.menu.options.setAttribute('data-name', filename);
	Elements.main.folder.menu.options.setAttribute('data-type', filetype);
	Elements.main.folder.menu.options.setAttribute('data-path', filepath);
}


async function rename(f) {
	document.querySelector('#btn-rename').addEventListener('click', async () => {
		const filepath = String(modal.getAttribute('data-path'));
		const filetype = String(modal.getAttribute('data-type'));
		const input = String(Elements.modal.rename.inputs.renameItem.value);

		let newFilepath;

		if (input) {
			newFilepath = fileSystem.changingFilepath(input, filepath, filetype);
			await fileSystem.rename(filepath, newFilepath);
			await applyFilenameChange(filepath, newFilepath, input);
			await settings.changeTagData(input, filepath, newFilepath, filetype);

			setAttributeModal(input, newFilepath, filetype);

			const previousDirectory = path.resolve(newFilepath, '..');
			const scrollBarPosition = Elements.mainArea.scrollTop;

			await f(previousDirectory);
			await loadMenuTags(f);
			Elements.mainArea.scrollTo(0, scrollBarPosition);
		}

		setAttributeModal();
		closeWindowRenameFiles();
	});
}



module.exports = {
	openWindowRenameFiles,
	closeWindowRenameFiles,
	rename,
};
