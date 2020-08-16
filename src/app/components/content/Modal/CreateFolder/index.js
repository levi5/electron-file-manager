const { Elements } = require('../../../../../utils/Elements');



const modal = Elements.modal.screen;
const createFolderScreen = Elements.modal.createFolder.screen;


function openWindowCreateFolder() {
	modal.classList.add('on');
	createFolderScreen.classList.add('on');
}


function closeWindowCreateFolder() {
	Elements.modal.createFolder.inputs.name.value = '';
	Elements.modal.createFile.inputs.name.placeholder = 'Digite o nome da pasta';
	modal.classList.remove('on');
	createFolderScreen.classList.remove('on');
}


module.exports = {
	openWindowCreateFolder,
	closeWindowCreateFolder,
};
