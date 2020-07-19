/* eslint-disable no-undef */
const { HtmlElements } = require('../../../utils/Elements');

const section = document.querySelector('section');

const sectionWidth = parseInt(section.offsetWidth, 10);
const separatorWidth = parseInt(HtmlElements.separador.offsetWidth, 10);

let startWidth;

function doDrag(e) {
	startWidth = parseInt(e.clientX, 10);
	const mainAreaWidthValue = sectionWidth - startWidth;

	HtmlElements.leftMenu.style.width = `${startWidth}px`;
	HtmlElements.mainArea.style.width = `${mainAreaWidthValue - separatorWidth}px`;
}

function stopDrag(_e) {
	section.removeEventListener('pointermove', doDrag, false);
	HtmlElements.separador.removeEventListener('pointerup', stopDrag, false);
}

function initDrag(_e) {
	startWidth = parseInt(HtmlElements.leftMenu.offsetWidth, 10);
	HtmlElements.separador.addEventListener('pointerup', stopDrag, false);
	section.addEventListener('pointermove', doDrag, false);
}

HtmlElements.separador.addEventListener('pointerdown', initDrag, false);
