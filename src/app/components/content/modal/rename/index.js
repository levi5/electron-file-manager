/* eslint-disable no-undef */
const path = require('path');

const { HtmlElements } = require('../../../../../utils/Elements');
const fileSystem = require('../../../../../utils/fileSystem');
const userInterface = require('../../../../../utils/userInterface');
const settings = require('../../../../../utils/settings');
const { loadMenuTags } = require('../../left-menu/index');



async function applyFilenameChange(filepath, newFilepath, filename) {
	const itens = [...HtmlElements.mainArea.querySelectorAll('.item')];

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
	HtmlElements.menuFolderOptions.setAttribute('data-name', filename);
	HtmlElements.menuFolderOptions.setAttribute('data-type', filetype);
	HtmlElements.menuFolderOptions.setAttribute('data-path', filepath);
}

async function rename() {
	document.querySelector('#btn-modal-rename').addEventListener('click', async () => {
		const filepath = String(HtmlElements.modalRename.getAttribute('data-path'));
		const filetype = String(HtmlElements.modalRename.getAttribute('data-type'));
		const input = String(document.querySelector('#modal-rename input[name=rename-file]').value);

		let newFilepath;

		if (input) {
			newFilepath = fileSystem.changingFilepath(input, filepath, filetype);
			await fileSystem.rename(filepath, newFilepath);
			await applyFilenameChange(filepath, newFilepath, input);
			await settings.changeTagData(input, filepath, newFilepath, filetype);

			setAttributeModal(input, newFilepath, filetype);
			const previousDirectory = path.resolve(newFilepath, '..');


			const posScroll = HtmlElements.mainArea.scrollTop;

			await userInterface.openFolder(previousDirectory);
			await loadMenuTags();
			HtmlElements.mainArea.scrollTo(0, posScroll);
		}

		setAttributeModal();
		HtmlElements.modalRename.classList.remove('on');
	});
}


module.exports = {
	rename,
};
