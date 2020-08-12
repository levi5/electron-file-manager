/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const path = require('path');

const fileSystem = require('./fileSystem');
const search = require('./search');
const { Elements } = require('./Elements');
const settings = require('./settings');
const { setTitleBar, navigatingTitleBar } = require('../app/components/tittleBar/index');
const { folderOptions } = require('../app/components/content/folderOptions/functions');
const { openWindowRenameFiles } = require('../app/components/content/Modal/Rename/index');



function setFileTag() {
	const itens = [...Elements.mainArea.querySelectorAll('.item')];

	itens.map(async (item) => {
		const filePath = await item.getAttribute('data-path');
		const dataTag = await settings.getTagConfig(filePath);

		if (dataTag) {
			const element = item;
			element.querySelector('.tag-icon').style.backgroundColor = dataTag.iconBackgroundColor;
			element.querySelector('.tag-name').style.color = dataTag.tagNameColor;
			element.querySelector('.tag-name').textContent = dataTag.tagName;
			element.querySelector('.tag-emoji').textContent = dataTag.tagEmoji;
		}
	});
}




function clearView() {
	const template = document.querySelector('#item-template');
	const modal = Elements.modal.screen;
	const menuGlobal = Elements.main.content.global.menu.options;
	const menu = Elements.main.content.folder.menu.options;


	Elements.main.content.screenItems.innerHTML = '';
	Elements.main.content.screenItems.appendChild(modal);
	Elements.main.content.screenItems.appendChild(menuGlobal);
	Elements.main.content.screenItems.appendChild(menu);
	Elements.main.content.screenItems.appendChild(template);
}


function getImage(file) {
	let src = '';
	const extname = file.extname.replace('.', '');
	const extensions = ['iso', 'jpg', 'pdf', 'png', 'txt'];

	if (file.type === 'file') {
		if (extensions.indexOf(extname) !== -1) {
			src = path.resolve(__dirname, '..', '..', 'public', 'assets', 'icons', 'main-area', 'files', `${extname}`, `${file.type}.svg`);
		} else {
			src = path.resolve(__dirname, '..', '..', 'public', 'assets', 'icons', 'main-area', 'files', 'undefined', `${file.type}.svg`);
		}
	} else if (file.type === 'directory') {
		src = path.resolve(__dirname, '..', '..', 'public', 'assets', 'icons', 'main-area', 'dir', `${file.type}.svg`);
	}


	return src;
}



function displayFile(file, hideFiles = true) {
	const template = document.querySelector('#item-template');
	const clone = document.importNode(template.content, true);

	if (hideFiles) {
		const firstCharacter = file.file[0];
		if (firstCharacter === '.') { return; }
	}


	if (file.type) {
		clone.querySelector('.item').setAttribute('data-path', file.path);
		clone.querySelector('.item').setAttribute('data-type', file.type);
		clone.querySelector('.item').setAttribute('data-extname', file.extname);
		clone.querySelector('.item').setAttribute('onClick', 'selected(this)');
		clone.querySelector('.item').setAttribute('onPointerdown', 'selected(this)');

		clone.querySelector('img').src = getImage(file);
		clone.querySelector('img').setAttribute('data-filePath', file.path);



		if (file.type === 'directory') {
			clone.querySelector('img')
				.addEventListener('dblclick', async () => {
					await loadDirectory(file.path);
				}, false);
		}
		clone.querySelector('.item')
			.addEventListener('pointerdown', (e) => {
				if (e.button === 2) {
					closeFolderOptions();
					folderOptions(e.clientX, e.clientY, file.file, file.type, file.path, file.extname);
				}
			}, false);
		clone.querySelector('.item .filename').addEventListener('dblclick', () => {
			openWindowRenameFiles(file.file, file.type, file.path);
		});

		clone.querySelector('.filename').innerText = file.file;
		Elements.main.content.screenItems.appendChild(clone);
	}
}




async function displayFiles(files) {
	const hiddenFile = await settings.getOptionHiddenFile();
	const sortedFiles = fileOrdering(files);

	sortedFiles.forEach((file) => {
		displayFile(file, hiddenFile);
	});

	search.resetIndex(sortedFiles);
	navigatingTitleBar(loadDirectory);
	setFileTag();
	return 0;
}


function fileOrdering(files) {
	const sortFiles = files.sort((a, b) => (a.file).localeCompare(b.file));
	return sortFiles;
}



async function loadDirectory(folderPath) {
	const { files, error } = await fileSystem.getFilesInFolder(folderPath);
	settings.setRecentDirectories(folderPath);
	clearView();
	if (error) {
		permissionErrors(error);
		console.log('Sorry, we could not load your home folder');
		return;
	}

	const fileData = await fileSystem.inspectAndDescribeFiles(folderPath, files);
	await setTitleBar(folderPath);
	await displayFiles(fileData);
}




function bindSearchField(cb) {
	document.getElementById('input-search').addEventListener('keyup', cb, false);
	document.getElementById('input-search').addEventListener('search', cb, false);
}



function filterResults(results) {
	const validFilePaths = results.map((result) => result.ref);
	const items = document.getElementsByClassName('item');
	for (let i = 0; i < items.length; i += 1) {
		const item = items[i];

		const filePath = item.getElementsByTagName('img')[0]
			.getAttribute('data-filepath');
		if (validFilePaths.indexOf(filePath) !== -1) {
			item.style = null;
		} else {
			item.style = 'display:none;';
		}
	}
}



function resetFilter() {
	const items = document.getElementsByClassName('item');
	for (let i = 0; i < items.length; i += 1) {
		items[i].style = null;
	}
}



function getCurrentDirectory() {
	const elements = [...Elements.header.screen.querySelectorAll('.title-bar ul div')];
	const filepath = elements[elements.length - 1].getAttribute('data-path');
	return filepath;
}




function closeFolderOptions() {
	Elements.main.content.folder.menu.options.classList.remove('on');
}




function permissionErrors(_err) {
	alert('this folder or files cannot be accessed by you');
}




module.exports = {
	displayFiles,
	loadDirectory,
	bindSearchField,
	filterResults,
	resetFilter,
	getCurrentDirectory,
	getImage,
};
