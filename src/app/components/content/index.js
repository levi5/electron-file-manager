/* eslint-disable no-undef */
const { Elements } = require('../../../utils/Elements');

const section = document.querySelector('section');

const sectionWidth = parseInt(section.offsetWidth, 10);
const separatorWidth = parseInt(Elements.separador.offsetWidth, 10);

let startWidth;

function doDrag(e) {
	startWidth = parseInt(e.clientX, 10);
	const mainAreaWidthValue = sectionWidth - startWidth;

	Elements.leftMenu.style.width = `${startWidth}px`;
	Elements.mainArea.style.width = `${mainAreaWidthValue - separatorWidth}px`;
}

function stopDrag(_e) {
	section.removeEventListener('pointermove', doDrag, false);
	Elements.separador.removeEventListener('pointerup', stopDrag, false);
}

function initDrag(_e) {
	startWidth = parseInt(Elements.leftMenu.offsetWidth, 10);
	Elements.separador.addEventListener('pointerup', stopDrag, false);
	section.addEventListener('pointermove', doDrag, false);
}

Elements.separador.addEventListener('pointerdown', initDrag, false);
