/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const path = require('path');

const fileSystem = require('./fileSystem');
const search = require('./search');
const { HtmlElements } = require('./Elements');
const { getTagConfig } = require('./settings');
const { setTitleBar, navigatingTitleBar } = require('../app/components/tittleBar/index');


function clearView() {
	const template = document.querySelector('#item-template');
	const menuFolderOptions = document.querySelector('#folder-options');

	HtmlElements.mainArea.innerHTML = '';
	HtmlElements.mainArea.append(menuFolderOptions);
	HtmlElements.mainArea.appendChild(template);
}




async function displayFile(file) {
	const template = document.querySelector('#item-template');
	const clone = document.importNode(template.content, true);

	const dataTag = await getTagConfig(file.path);



	if (dataTag) {
		clone.querySelector('.tag-icon').style.backgroundColor = dataTag.iconBackgroundColor;
		clone.querySelector('.tag-name').style.color = dataTag.tagNameColor;
		clone.querySelector('.tag-name').textContent = dataTag.tagName;
	}


	if (file.type) {
		const urlIma = path.resolve(__dirname, '..', '..', 'public', 'assets', 'icons', 'main-area', `${file.type}.svg`);

		clone.querySelector('.item').setAttribute('data-path', file.path);
		clone.querySelector('img').src = urlIma;
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
					folderOptions(e.clientX, e.clientY, file.file, file.type, file.path);
				}
			}, false);

		clone.querySelector('.filename').innerText = file.file;
		HtmlElements.mainArea.appendChild(clone);
	}
}



function displayFiles(err, files) {
	if (err) {
		return console.log('Sorry, we could not display your files');
	}

	files.forEach((file) => {
		displayFile(file);
	});
	search.resetIndex(files);
	navigatingTitleBar(openFolder);

	return 0;
}



function loadDirectory(folderPath) {
	fileSystem.getFilesInFolder(folderPath, (err, files) => {
		clearView();
		if (err) { console.log('Sorry, we could not load your home folder'); }

		fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
		return true;
	});
	setTitleBar(folderPath);
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



function folderOptions(x, y, filename, filetype, filePath) {
	let posX = x;
	let posY = y;
	const elementFolderOptions = document.querySelector('#folder-options');

	elementFolderOptions.classList.toggle('on');
	elementFolderOptions.setAttribute('data-name', filename);
	elementFolderOptions.setAttribute('data-type', filetype);
	elementFolderOptions.setAttribute('data-path', filePath);

	const [mainAreaData] = HtmlElements.mainArea.getClientRects();
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
	const filename = String(document.querySelector('#folder-options').getAttribute('data-path'));
	return filename;
}




module.exports = {
	displayFiles,
	loadDirectory,
	bindSearchField,
	filterResults,
	resetFilter,
	openFolder,
	getSelectedFileDirectory,
};
