/* eslint-disable no-undef */
const path = require('path');

const { HtmlElements } = require('../../../../../utils/Elements');
const fileSystem = require('../../../../../utils/fileSystem');


function applyFilenameChange(filepath, newFilepath, filename) {
	const itens = [...HtmlElements.mainArea.querySelectorAll('.item')];

	itens.map((item) => {
		const filePath = item.getAttribute('data-path');
		if (filePath === filepath) {
			const elementFilename = item.querySelector('.filename');
			elementFilename.textContent = filename;
			elementFilename.setAttribute('data-path', newFilepath);
		}
		return true;
	});
}


function rename() {
	document.querySelector('#btn-modal-rename').addEventListener('click', async () => {
		const filepath = String(HtmlElements.modalRename.getAttribute('data-path'));
		const filetype = String(HtmlElements.modalRename.getAttribute('data-type'));
		const input = String(document.querySelector('#modal-rename input[name=rename-file]').value);
		let newFilepath = 'sem nome';

		if (input) {
			if (filetype === 'file') {
				newFilepath = path.join(path.dirname(filepath), input);
			} else {
				newFilepath = path.join(path.resolve(filepath, '..'), input);
			}
			await fileSystem.rename(filepath, newFilepath);
			applyFilenameChange(filepath, newFilepath, input);
		}
		HtmlElements.modalRename.classList.toggle('on');
	});
}


module.exports = {
	rename,
};
