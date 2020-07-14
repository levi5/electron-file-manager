/* eslint-disable no-undef */
const electron = require('electron');
const path = require('path');

const fileSystem = require('../../../utils/fileSystem');



const { remote } = electron;


// Definition of html elements
// window control buttons (close, minimize and maximize)
const closeButton = document.getElementById('btn-close-window');
const minimizeButton = document.getElementById('btn-minimize-window');
const maximizeButton = document.getElementById('btn-maximize-window');


const titleBar = document.querySelector('.title-bar');
const titleBarDirectories = document.querySelector('.title-bar ul');




function createPathFolders(directory) {
	const directoryNames = directory.split(path.sep);

	const fullDirectors = [];
	let folders = '';

	directoryNames.map((item) => {
		folders = folders + item + path.sep;
		fullDirectors.push(folders);
		return true;
	});

	return {
		links: fullDirectors,
		directors: directoryNames,
	};
}



function setTitleBar(directory) {
	const elementSize = 100;
	const { links, directors } = createPathFolders(directory);

	titleBarDirectories.innerHTML = '';

	let numberElements = Math.trunc(100 / ((elementSize * 100)
	/ (parseInt(titleBar.offsetWidth, 10))));

	const directorySize = directors.length;


	if (directorySize > numberElements) {
		numberElements = directorySize - numberElements;

		directors.map((item, index) => {
			if (item) {
				if (index >= numberElements) {
					const li = document.createElement('div');
					const label = document.createElement('label');
					li.setAttribute('id', `${index}`);
					li.setAttribute('data-path', `${links[index]}`);
					label.textContent = item;
					li.appendChild(label);
					titleBarDirectories.appendChild(li);
				}
			}
			return true;
		});
	} else {
		directors.map((item, index) => {
			if (item) {
				if (index <= numberElements) {
					const li = document.createElement('div');
					const label = document.createElement('label');
					li.setAttribute('id', `${index}`);
					li.setAttribute('data-path', `${links[index]}`);
					label.textContent = item;
					li.appendChild(label);
					titleBarDirectories.appendChild(li);
				}
			}
			return true;
		});
	}
}



closeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.close();
});

minimizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();
	window.minimize();
});

maximizeButton.addEventListener('click', (_e) => {
	const window = remote.getCurrentWindow();

	if (!window.isMaximized()) {
		window.maximize();
		document.documentElement.style.setProperty('--border-radius', '0px');
	} else {
		window.unmaximize();
		document.documentElement.style.setProperty('--border-radius', '10px');
	}
});




const previousDirectoryButton = document.querySelector('header .title-bar .previous-directory');
const nextDirectoryButton = document.querySelector('header .title-bar .next-directory');


previousDirectoryButton.addEventListener('click', () => {
	const scrollPosX = titleBarDirectories.scrollLeft;
	titleBarDirectories.scrollTo(scrollPosX - 20, 0);
});


nextDirectoryButton.addEventListener('click', () => {
	const scrollPosX = titleBarDirectories.scrollLeft;
	titleBarDirectories.scrollTo(scrollPosX + 20, 0);
});



function navigatingTitleBar(f) {
	const itens = document.querySelectorAll('.title-bar ul div');
	for (let i = 0; i < itens.length; i += 1) {
		itens[i].addEventListener('click', async () => {
			const folderPath = await String(itens[i].getAttribute('data-path'));
			await f(folderPath);
		});
	}
}


const directory = fileSystem.getUsersHomeFolder();
setTitleBar(directory);



module.exports = { setTitleBar, navigatingTitleBar };
