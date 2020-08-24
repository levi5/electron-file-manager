/* eslint-disable no-undef */
/* eslint-disable prefer-const */
// const getSize = require('get-folder-size');
const byteSize = require('byte-size');
const moment = require('moment');

const fileSystem = require('../../../../utils/fileSystem');
const { Elements } = require('../../../../utils/Elements');

async function openWindowDetails(filename, _filetype, filepath) {
	const { screen } = Elements.main.details;
	screen.classList.add('on');
	let {
		size, atime, birthtime, mtime,
	} = await fileSystem.getFileDetails(filepath);

	const lastAccess = moment(atime).format('DD/MM/YYYY - HH:MM:SS');
	const creation = moment(birthtime).format('DD/MM/YYYY - HH:MM:SS');
	const modification = moment(mtime).format('DD/MM/YYYY - HH:MM:SS');


	screen.querySelector('.content').innerHTML = '';


	size = byteSize(size);
	const content = `
				<img src="./assets/icons/left-menu/archive.svg" alt="">
				<div>
					<label name="name">${filename}</label>
					<!--<label name="size">Tamanho: ${size}</label>-->
					<label name="size">Criação: ${creation}</label>
					<label name="size">Modificação: ${modification}</label>
					<label name="size">Acesso: ${lastAccess}</label>
				</div>

		`;
	screen.querySelector('.content').innerHTML = content;
}


function closeWindowDetails() {
	Elements.main.details.screen.classList.remove('on');
}


function loadDetails() {
	document.querySelector('#btn-close-details-screen').addEventListener('click', () => {
		closeWindowDetails();
	});
}

module.exports = {
	openWindowDetails,
	closeWindowDetails,
	loadDetails,
};
