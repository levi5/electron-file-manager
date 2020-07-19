/* eslint-disable no-undef */
const electron = require('electron');
const path = require('path');


const { HtmlElements } = require('../../../utils/Elements');

const { remote } = electron;


function createPathFolders(directory) {
	const directoryNames = directory.split(path.sep);


	const fullDirectors = [];
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
	const li = document.createElement('div');
	const label = document.createElement('label');
	li.setAttribute('id', `${index}`);
	li.setAttribute('data-path', `${filepath}`);
	label.textContent = directory;
	li.appendChild(label);
	HtmlElements.titleBarNavMenu.appendChild(li);
}


function setTitleBar(directory) {
	const elementSize = 100;
	const { links, directors } = createPathFolders(directory);

	HtmlElements.titleBarNavMenu.innerHTML = '';

	let numberElements = Math.trunc(100 / ((elementSize * 100)
	/ (parseInt(HtmlElements.titleBar.offsetWidth, 10))));

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


HtmlElements.buttons.closeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.close();
});

HtmlElements.buttons.minimizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.minimize();
});

HtmlElements.buttons.maximizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();

	if (!window.isMaximized()) {
		window.maximize();
		document.documentElement.style.setProperty('--border-radius', '0px');
	} else {
		window.unmaximize();
		document.documentElement.style.setProperty('--border-radius', '10px');
	}
});




HtmlElements.buttons.previousDirectory.addEventListener('click', () => {
	const scrollPosX = HtmlElements.titleBarNavMenu.scrollLeft;
	HtmlElements.titleBarNavMenu.scrollTo(scrollPosX - 20, 0);
});


HtmlElements.buttons.nextDirectory.addEventListener('click', () => {
	const scrollPosX = HtmlElements.titleBarNavMenu.scrollLeft;
	HtmlElements.titleBarNavMenu.scrollTo(scrollPosX + 20, 0);
});




function navigatingTitleBar(f) {
	const tabs = [...HtmlElements.titleBarNavMenu.children];

	tabs.map((tab) => {
		tab.addEventListener('click', async (_event) => {
			const folderPath = await String(tab.getAttribute('data-path'));
			f(folderPath);
		}, false);
		return true;
	});
}




module.exports = { setTitleBar, navigatingTitleBar };
