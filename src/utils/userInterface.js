/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const path = require('path');

const fileSystem = require('./fileSystem');
const search = require('./search');
const { setTitleBar, navigatingTitleBar } = require('../app/components/tittleBar/index');


function clearView() {
	const mainArea = document.getElementById('main-area');
	const template = document.querySelector('#item-template');
	const MenuFolderOptions = document.querySelector('#folder-options');
	mainArea.innerHTML = '';
	mainArea.append(MenuFolderOptions);
	mainArea.appendChild(template);
}




function displayFile(file) {
	const mainArea = document.getElementById('main-area');
	const template = document.querySelector('#item-template');
	const clone = document.importNode(template.content, true);


	if (file.type) {
		const urlIma = path.resolve(__dirname, '..', '..', 'public', 'assets', 'icons', 'main-area', `${file.type}.svg`);

		clone.querySelector('img').src = urlIma;
		clone.querySelector('img').setAttribute('data-filePath', file.path);


		if (file.type === 'directory') {
			clone.querySelector('img')
				.addEventListener('dblclick', () => {
					openFolder(file.path);
				}, false);

			clone.querySelector('.item')
				.addEventListener('pointerdown', (e) => {
					if (e.button === 2) {
						folderOptions(e.clientX, e.clientY, file.file);
					}
				}, false);
		}
		clone.querySelector('.filename').innerText = file.file;
		mainArea.appendChild(clone);
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
		if (err) {
			console.log('Sorry, we could not load your home folder');
		}

		fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
		return true;
	});
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



function folderOptions(x, y, filename) {
	let posX = x;
	let posY = y;
	const mainArea = document.getElementById('main-area');
	const elementFolderOptions = document.querySelector('#folder-options');

	elementFolderOptions.classList.toggle('on');

	elementFolderOptions.setAttribute('data-path', filename);

	const [mainAreaData] = mainArea.getClientRects();
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
	setTitleBar(folderPath);
	loadDirectory(folderPath);
}




module.exports = {
	displayFiles,
	loadDirectory,
	bindSearchField,
	filterResults,
	resetFilter,
	openFolder,
};
