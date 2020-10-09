/* eslint-disable no-undef */
const htmlElements = require('../../../utils/Elements');
const settings = require('../../../utils/settings');
const userInterface = require('../../../utils/userInterface');
const { openWindowCreateFolder } = require('../content/Modal/CreateFolder/index');



function update(hiddenFiles) {
	if (hiddenFiles) {
		htmlElements.Elements.optionsBar
			.buttons.viewHiddenFiles.classList.add('off');
	} else {
		htmlElements.Elements.optionsBar
			.buttons.viewHiddenFiles.classList.remove('off');
	}
}


async function toggleClassButtonHiddenFiles() {
	const hiddenFiles = await settings.getOptionHiddenFile();
	update(hiddenFiles);
}

async function showAndHide() {
	let hiddenFiles;
	htmlElements.Elements.optionsBar.buttons.viewHiddenFiles.classList.toggle('off');
	const { value: className } = htmlElements
		.Elements.optionsBar.buttons
		.viewHiddenFiles.classList;

	const classList = className.split(/\s+/);

	if (classList.indexOf('off') !== -1) { hiddenFiles = true; } else { hiddenFiles = false; }

	const response = await settings.setOptionHiddenFile(hiddenFiles);
	if (!response) {
		const filepath = await userInterface.getCurrentDirectory();
		userInterface.loadDirectory(filepath);
	}
}
function viewHiddenFiles() {
	htmlElements.Elements.optionsBar.buttons.viewHiddenFiles.addEventListener('click', async () => {
		showAndHide();
	});
	toggleClassButtonHiddenFiles();
}


function createFolder() {
	htmlElements.Elements.optionsBar.buttons.newFolder.addEventListener('click', () => {
		openWindowCreateFolder();
	});
}


function shortcutViewHiddenFiles() {
	let pressedCtrl = false;
	document.onkeyup = (e) => {
		if (e.key === 'Control') { pressedCtrl = false; }
	};
	document.onkeydown = (e) => {
		if (e.key === 'Control') { pressedCtrl = true; }
		if (e.key === 'h' && pressedCtrl === true) {
			showAndHide();
		}
	};
}

function optionsBarFunctions() {
	createFolder();
	viewHiddenFiles();
	shortcutViewHiddenFiles();
}


module.exports = {
	optionsBarFunctions,
	createFolder,
	viewHiddenFiles,
};
