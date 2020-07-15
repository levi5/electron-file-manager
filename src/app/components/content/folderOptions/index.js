/* eslint-disable no-undef */
const path = require('path');
const { openFolder } = require('../../../../utils/userInterface');


const folderOptions = document.querySelector('#folder-options');

function closeFolderOptions() {
	folderOptions.classList.remove('on');
}


document.body.addEventListener('click', () => {
	closeFolderOptions();
});

function getTitleBar() {
	let folderPath = '';

	const filename = String(document.querySelector('#folder-options').getAttribute('data-path'));

	const directory = document.querySelectorAll('.title-bar ul div label');
	for (let index = 0; index < directory.length; index += 1) {
		folderPath = folderPath + path.sep + directory[index].textContent;
	}

	folderPath = folderPath + path.sep + filename;
	return folderPath;
}



document.getElementById('open-folder').addEventListener('click', () => {
	folderPath = getTitleBar();
	openFolder(folderPath);
	closeFolderOptions();
});
