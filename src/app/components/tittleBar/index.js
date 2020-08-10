/* eslint-disable no-undef */
const electron = require('electron');
const path = require('path');


const { Elements } = require('../../../utils/Elements');

const { remote } = electron;


function createPathFolders(directory) {
	const fullDirectors = [];
	const directoryNames = directory.split(path.sep);

	let folders = '';

	directoryNames.map((item) => {
		if (item === '') {
			folders = path.sep;
		} else {
			folders = path.join(folders, item);
		}

		fullDirectors.push(folders);
		return true;
	});
	return {
		links: fullDirectors,
		directors: directoryNames,
	};
}


function createHtmlNavElementsTitleBar(directory, filepath, index) {
	const div = document.createElement('div');
	const label = document.createElement('label');

	div.setAttribute('id', `${index}`);
	div.setAttribute('data-path', `${filepath}`);
	label.textContent = directory;
	div.appendChild(label);
	Elements.header.screen.querySelector('.title-bar ul').appendChild(div);
}


function setTitleBar(directory) {
	const elementSize = 100;
	const { links, directors } = createPathFolders(directory);

	const directoryMenu = Elements.header.screen.querySelector('.title-bar ul');
	const directoryMenuContent = Elements.header.screen.querySelector('.title-bar');

	directoryMenu.innerHTML = '';

	let numberElements = Math.trunc(100 / ((elementSize * 100)
	/ (parseInt(directoryMenuContent.offsetWidth, 10))));

	const directorySize = directors.length;


	if (directorySize > numberElements) {
		numberElements = directorySize - numberElements;

		directors.map((item, index) => {
			if (item) {
				if (index >= numberElements) { createHtmlNavElementsTitleBar(item, links[index], index); }
			}
			return true;
		});
	} else {
		directors.map((item, index) => {
			if (item) {
				if (index <= numberElements) { createHtmlNavElementsTitleBar(item, links[index], index); }
			}
			return true;
		});
	}
}



async function navigatingTitleBar(f) {
	const tabs = [...Elements.header.screen.querySelector('.title-bar ul').children];

	tabs.map((tab) => {
		tab.addEventListener('click', async (_event) => {
			const folderPath = await String(tab.getAttribute('data-path'));
			f(folderPath);
		}, false);
		return true;
	});
}



function getSelectedFileDirectory() {
	const filename = String(Elements.main.content.folder.menu.options.getAttribute('data-path'));
	return filename;
}



function header() {
	Elements.header.screen.querySelector('#btn-close-window').addEventListener('click', (_e) => {
		const window = remote.getCurrentWindow();
		window.close();
	});


	Elements.header.screen.querySelector('#btn-minimize-window').addEventListener('click', (_e) => {
		const window = remote.getCurrentWindow();
		window.minimize();
	});


	Elements.header.screen.querySelector('#btn-maximize-window').addEventListener('click', (_e) => {
		const window = remote.getCurrentWindow();

		if (!window.isMaximized()) {
			window.maximize();
			document.documentElement.style.setProperty('--border-radius', '0px');
		} else {
			window.unmaximize();
			document.documentElement.style.setProperty('--border-radius', '10px');
		}
	});


	Elements.header.screen.querySelector('.previous-directory').addEventListener('click', () => {
		const scrollPosX = Elements.header.menu.directory.scrollLeft;
		Elements.header.menu.directory.scrollTo(scrollPosX - 20, 0);
	});


	Elements.header.screen.querySelector('.next-directory').addEventListener('click', () => {
		const scrollPosX = Elements.header.menu.directory.scrollLeft;
		Elements.header.menu.directory.scrollTo(scrollPosX + 20, 0);
	});
}


module.exports = {
	setTitleBar, navigatingTitleBar, getSelectedFileDirectory, header,
};
