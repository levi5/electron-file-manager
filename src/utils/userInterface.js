/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const path = require('path');

const fileSystem = require('./fileSystem');
const search = require('./search');
const { Elements } = require('./Elements');
const { getTagConfig } = require('./settings');
const { setTitleBar, navigatingTitleBar } = require('../app/components/tittleBar/index');
const settings = require('./settings');




function setFileTag() {
	const itens = [...Elements.mainArea.querySelectorAll('.item')];

	itens.map(async (item) => {
		const filePath = await item.getAttribute('data-path');
		const dataTag = await getTagConfig(filePath);

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
	const modal = Elements.modalRename;
	const menu = Elements.menuFolderOptions;

	Elements.mainArea.innerHTML = '';
	Elements.mainArea.appendChild(modal);
	Elements.mainArea.appendChild(menu);
	Elements.mainArea.appendChild(template);
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
		clone.querySelector('.item .filename').setAttribute('ondblclick', 'openWindowRenameFiles(this)');

		clone.querySelector('img').src = getImage(file);
		clone.querySelector('img').setAttribute('data-filePath', file.path);



		if (file.type === 'directory') {
			clone.querySelector('img')
				.addEventListener('dblclick', () => {
					openFolder(file.path);
				}, false);
		}
		clone.querySelector('.item')
			.addEventListener('pointerdown', (e) => {
				if (e.button === 2) {
					closeFolderOptions();
					folderOptions(e.clientX, e.clientY, file.file, file.type, file.path, file.extname);
				}
			}, false);

		clone.querySelector('.filename').innerText = file.file;
		Elements.mainArea.appendChild(clone);
	}
}




async function displayFiles(files) {
	const hiddenFile = await settings.getOptionHiddenFile();
	const sortedFiles = fileOrdering(files);

	sortedFiles.forEach((file) => {
		displayFile(file, hiddenFile);
	});

	search.resetIndex(sortedFiles);
	navigatingTitleBar(openFolder);
	setFileTag();
	return 0;
}


function fileOrdering(files) {
	const sortFiles = files.sort((a, b) => (a.file).localeCompare(b.file));
	return sortFiles;
}



async function loadDirectory(folderPath) {
	const { files, error } = await fileSystem.getFilesInFolder(folderPath);

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
	const elements = [...Elements.titleBarNavMenu.querySelectorAll('div')];
	const filepath = elements[elements.length - 1].getAttribute('data-path');
	return filepath;
}


function folderOptions(x, y, filename, filetype, filePath, extname) {
	let posX = x;
	let posY = y;
	const elementFolderOptions = document.querySelector('#folder-options');
	Elements.modalRename.classList.remove('on');

	elementFolderOptions.classList.toggle('on');
	elementFolderOptions.setAttribute('data-name', filename);
	elementFolderOptions.setAttribute('data-type', filetype);
	elementFolderOptions.setAttribute('data-path', filePath);
	elementFolderOptions.setAttribute('data-extname', extname);
	elementFolderOptions.querySelector('#folder-options-title').textContent = filename;

	const [mainAreaData] = Elements.mainArea.getClientRects();
	const {
		top, bottom, left, right,
	} = mainAreaData;

	const elementFolderOptionsWidth = parseInt(elementFolderOptions.clientWidth, 10);
	const elementFolderOptionsHeight = parseInt(elementFolderOptions.clientHeight, 10);

	const limitX = posX + elementFolderOptionsWidth + 20;
	const limitY = posY + elementFolderOptionsHeight + 20;

	if (limitX > right) posX -= (limitX - right);

	if (limitX < left) posX += (limitX - left);

	if (limitY > bottom) posY -= (limitY - bottom);

	if (limitY < top) posY += (limitY - top);

	elementFolderOptions.style.left = `${posX}px`;
	elementFolderOptions.style.top = `${posY}px`;
}



function openFolder(folderPath) {
	loadDirectory(folderPath);
}



function getSelectedFileDirectory() {
	const filename = String(Elements.menuFolderOptions.getAttribute('data-path'));
	return filename;
}



function closeFolderOptions() {
	Elements.menuFolderOptions.classList.remove('on');
}



function closeModalRename() {
	Elements.modalRename.classList.remove('on');
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
	openFolder,
	getSelectedFileDirectory,
	closeFolderOptions,
	closeModalRename,
	getCurrentDirectory,
	getImage,

};
