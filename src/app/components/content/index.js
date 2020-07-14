/* eslint-disable no-undef */
const separador = document.querySelector('section .vertical-separator');
const leftMenu = document.querySelector('section .left-menu');
const mainArea = document.querySelector('section #main-area');
const section = document.querySelector('section');


const sectionWidth = parseInt(section.offsetWidth, 10);
const separatorWidth = parseInt(separador.offsetWidth, 10);

let startWidth;

function doDrag(e) {
	startWidth = parseInt(e.clientX, 10);

	const mainAreaWidthValue = sectionWidth - startWidth;

	leftMenu.style.width = `${startWidth}px`;
	mainArea.style.width = `${mainAreaWidthValue - separatorWidth}px`;
}

function stopDrag(_e) {
	section.removeEventListener('pointermove', doDrag, false);
	separador.removeEventListener('pointerup', stopDrag, false);
}

function initDrag(_e) {
	startWidth = parseInt(leftMenu.offsetWidth, 10);
	separador.addEventListener('pointerup', stopDrag, false);
	section.addEventListener('pointermove', doDrag, false);
}


separador.addEventListener('pointerdown', initDrag, false);
