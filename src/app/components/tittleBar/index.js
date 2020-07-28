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
	Elements.titleBarNavMenu.appendChild(div);
}


function setTitleBar(directory) {
	const elementSize = 100;
	const { links, directors } = createPathFolders(directory);

	Elements.titleBarNavMenu.innerHTML = '';

	let numberElements = Math.trunc(100 / ((elementSize * 100)
	/ (parseInt(Elements.titleBar.offsetWidth, 10))));

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
	const tabs = [...Elements.titleBarNavMenu.children];

	tabs.map((tab) => {
		tab.addEventListener('click', async (_event) => {
			const folderPath = await String(tab.getAttribute('data-path'));
			f(folderPath);
		}, false);
		return true;
	});
}




Elements.buttons.closeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.close();
});


Elements.buttons.minimizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.minimize();
});


Elements.buttons.maximizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();

	if (!window.isMaximized()) {
		window.maximize();
		document.documentElement.style.setProperty('--border-radius', '0px');
	} else {
		window.unmaximize();
		document.documentElement.style.setProperty('--border-radius', '10px');
	}
});


Elements.buttons.previousDirectory.addEventListener('click', () => {
	const scrollPosX = Elements.titleBarNavMenu.scrollLeft;
	Elements.titleBarNavMenu.scrollTo(scrollPosX - 20, 0);
});


Elements.buttons.nextDirectory.addEventListener('click', () => {
	const scrollPosX = Elements.titleBarNavMenu.scrollLeft;
	Elements.titleBarNavMenu.scrollTo(scrollPosX + 20, 0);
});




module.exports = { setTitleBar, navigatingTitleBar };
