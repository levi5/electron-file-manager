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
