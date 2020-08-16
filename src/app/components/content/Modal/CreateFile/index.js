const { Elements } = require('../../../../../utils/Elements');

const modal = Elements.modal.screen;
const createFileScreen = Elements.modal.createFile.screen;


function openWindowCreateFile() {
	modal.classList.add('on');
	createFileScreen.classList.add('on');
}

function closeWindowCreateFile() {
	Elements.modal.createFile.inputs.name.value = '';
	Elements.modal.createFile.inputs.name.placeholder = 'Digite o nome do arquivo';
	modal.classList.remove('on');
	createFileScreen.classList.remove('on');
}

module.exports = {
	openWindowCreateFile,
	closeWindowCreateFile,
};
