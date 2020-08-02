/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');


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

	Elements.modal.rename.screen.classList.remove('on');

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
};
