/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function selected(e) {
	const itens = [...document.querySelectorAll('.item')];
	itens.map((item) => {
		item.classList.remove('selected');
		return true;
	});
	e.classList.add('selected');
}



function openWindowRenameFiles(e) {
	const filepath = e.parentNode.getAttribute('data-path');
	const filetype = e.parentNode.getAttribute('data-type');
	const filename = e.parentNode.querySelector('.filename').textContent;

	const [DOMRect] = e.parentNode.getClientRects();

	const {
		x, y, width, height,
	} = DOMRect;


	posX = x;
	posY = y;
	posX -= (width / 2);
	posY += height;


	const modal = document.querySelector('#modal-rename');
	modal.classList.toggle('on');
	modal.querySelector('input[name=rename-file]').value = filename;
	modal.setAttribute('data-path', filepath);
	modal.setAttribute('data-type', filetype);

	const [mainAreaData] = document.querySelector('#main-area').getClientRects();
	const {
		top, bottom, left, right,
	} = mainAreaData;


	const modalWidth = parseInt(modal.clientWidth, 10);
	const modalHeight = parseInt(modal.clientHeight, 10);

	const limitX = posX + modalWidth + 20;
	const limitY = posY + modalHeight + 20;

	if (limitX > right) posX -= (limitX - right);

	if (limitX < left) posX += (limitX - left);

	if (limitY > bottom) posY -= (limitY - bottom);

	if (limitY < top) posY += (limitY - top);

	modal.style.left = `${posX}px`;
	modal.style.top = `${posY}px`;
}
