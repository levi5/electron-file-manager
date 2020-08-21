const { Elements } = require('../../../../../utils/Elements');

const modal = Elements.modal.screen;
const addFolderToMenuScreen = Elements.modal.addFolderToMenu.screen;



function openWindowAddFolderToMenu(filename, filetype, filepath) {
	modal.classList.add('on');
	addFolderToMenuScreen.classList.add('on');
	addFolderToMenuScreen.setAttribute('data-name', filename);
	addFolderToMenuScreen.setAttribute('data-type', filetype);
	addFolderToMenuScreen.setAttribute('data-path', filepath);
	addFolderToMenuScreen.querySelector('label[name=folder-name]').textContent = filename;
}

function closeWindowAddFolderToMenu() {
	modal.classList.remove('on');
	addFolderToMenuScreen.classList.remove('on');
}

function selectFolderIcon() {
	const icon = Elements.modal.addFolderToMenu.screen.querySelector('.content img');
	const imgs = [...Elements.modal.addFolderToMenu.screen.querySelectorAll('.content-icons img')];
	imgs.map((img) => {
		img.addEventListener('click', () => {
			const src = img.getAttribute('src');
			icon.setAttribute('src', src);
		});
		return true;
	});
}

function addOptionInMenu(functionLoadDirectory, functionLoadMenu) {
	const add = Elements.modal.addFolderToMenu.screen.querySelector('#btn-add-folder-to-menu');
	add.addEventListener('click', async () => {
		const name = addFolderToMenuScreen.getAttribute('data-name');
		const path = addFolderToMenuScreen.getAttribute('data-path');
		const type = addFolderToMenuScreen.getAttribute('data-type');
		const icon = Elements.modal.addFolderToMenu.screen.querySelector('.content img').getAttribute('src');
		const data = [{
			name,
			path,
			type,
			icon,
			navigation: true,
			edit: true,
			visible: true,
		}];

		await functionLoadMenu(data, 'ADD', functionLoadDirectory);
		closeWindowAddFolderToMenu();
	});
}

function closeModal() {
	const close = Elements.modal.addFolderToMenu.screen.querySelector('#btn-cancel-add-folder-to-menu');
	close.addEventListener('click', () => {
		closeWindowAddFolderToMenu();
	});
}

function loadFolderToMenu(loadDirectory, functionLoadMenu) {
	selectFolderIcon();
	addOptionInMenu(loadDirectory, functionLoadMenu);
	closeModal();
}


module.exports = {
	openWindowAddFolderToMenu,
	closeWindowAddFolderToMenu,
	loadFolderToMenu,
};
