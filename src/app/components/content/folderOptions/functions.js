/* eslint-disable max-len */
/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');
const { closeWindowRenameFiles } = require('../Modal/Rename/index');


function closeFolderOptions() {
	Elements.main.content.folder.menu.options.classList.remove('on');
}
function closeMenuGlobal() {
	Elements.main.content.global.menu.options.classList.remove('on');
}


function closeModals() {
	closeWindowRenameFiles();
}



function menuGlobal(x, y) {
	let posX = x;
	let posY = y;

	Elements.main.content.folder.menu.options.classList.remove('on');
	Elements.main.content.global.menu.options.classList.toggle('on');

	const [mainAreaData] = Elements.mainArea.getClientRects();
	const {
		top, bottom, left, right,
	} = mainAreaData;

	const elementFolderOptionsWidth = parseInt(Elements.main.content.global.menu.options.clientWidth, 10);
	const elementFolderOptionsHeight = parseInt(Elements.main.content.global.menu.options.clientHeight, 10);

	const limitX = posX + elementFolderOptionsWidth + 20;
	const limitY = posY + elementFolderOptionsHeight + 20;

	if (limitX > right) posX -= (limitX - right);

	if (limitX < left) posX += (limitX - left);

	if (limitY > bottom) posY -= (limitY - bottom);

	if (limitY < top) posY += (limitY - top);

	Elements.main.content.global.menu.options.style.left = `${posX}px`;
	Elements.main.content.global.menu.options.style.top = `${posY}px`;
}




function hideMenuOptions(type, elements) {
	elements.map((element) => {
		const li = element;
		const dataType = String(li.getAttribute('data-type'));

		if (type === dataType) {
			li.style.display = 'flex';
		} else if (type !== dataType && dataType !== 'all') {
			li.style.display = 'none';
		} else {
			li.style.display = 'flex';
		}
		return true;
	});
}




function folderOptions(x, y, filename, filetype, filePath, extname) {
	let posX = x;
	let posY = y;


	const elementFolderOptions = document.querySelector('#folder-options');
	const elements = [...document.querySelectorAll('#folder-options ul li')];
	hideMenuOptions(filetype, elements);

	closeModals();
	Elements.main.content.global.menu.options.classList.remove('on');

	elementFolderOptions.classList.toggle('on');
	elementFolderOptions.setAttribute('data-name', filename);
	elementFolderOptions.setAttribute('data-type', filetype);
	elementFolderOptions.setAttribute('data-path', filePath);
	elementFolderOptions.setAttribute('data-extname', extname);
	elementFolderOptions.querySelector('#folder-options-title').textContent = filename;

	const [mainAreaData] = Elements.mainArea.getClientRects();
	const {
		top, bottom, left, right,
	} = mainAreaData;


	const elementFolderOptionsWidth = parseInt(elementFolderOptions.clientWidth, 10);
	const elementFolderOptionsHeight = parseInt(elementFolderOptions.clientHeight, 10);


	const limitX = posX + elementFolderOptionsWidth + 20;
	const limitY = posY + elementFolderOptionsHeight + 20;

	console.log(limitY, bottom, posX, posY);
	if (limitX > right) posX -= (limitX - right);

	if (limitX < left) posX += (limitX - left);

	if (limitY > bottom) posY -= (limitY - bottom);

	if (limitY < top) posY += (limitY - top);

	elementFolderOptions.style.left = `${posX}px`;
	elementFolderOptions.style.top = `${posY}px`;
}


module.exports = {
	folderOptions,
	hideMenuOptions,
	closeFolderOptions,
	closeMenuGlobal,
	menuGlobal,
};
