const path = require('path');

const { getCurrentDirectory } = require('./userInterface');
const fileSystem = require('./fileSystem');
const { Elements } = require('./Elements');
const { closeWindowCreateFolder } = require('../app/components/content/Modal/CreateFolder/index');
const { closeWindowCreateFile } = require('../app/components/content/Modal/CreateFile/index');




function createFileOrFolder(functionLoadDirectory, option) {
	let elementHTML;
	let closeWindow;

	let name;
	let fullName;
	let type;
	let ext;

	if (option === 'directory') {
		elementHTML = Elements.modal.createFolder;
		closeWindow = closeWindowCreateFolder;
		type = 'directory';
	} else {
		elementHTML = Elements.modal.createFile;
		closeWindow = closeWindowCreateFile;
		type = 'file';
		ext = elementHTML.inputs.ext.value;
	}

	name = String(elementHTML.inputs.name.value);

	elementHTML.buttons.create.addEventListener('click', async () => {
		if (type === 'file') {
			name = ext ? name + ext : `${name}.TXT`;
		}

		if (name) {
			const currentDirectory = getCurrentDirectory();
			const directory = path.join(currentDirectory, name);
			const { error, _message } = await fileSystem.createFolderOrFile(directory, type);
			if (!error) {
				const scrollBarPosition = Elements.main.content.screenItems.scrollTop;
				await functionLoadDirectory(currentDirectory);
				Elements.main.content.screenItems.scrollTo(0, scrollBarPosition);
			}
		}
		closeWindow();
	});

	elementHTML.buttons.cancel.addEventListener('click', () => {
		closeWindow();
	});

	elementHTML.inputs.name.addEventListener('keyup', (e) => {
		ext = ext || '.TXT';
		name = String(e.target.value);
		fullName = String(name + ext);
		fullName = type === 'directory' ? name : fullName;
		elementHTML.labels.name.textContent = `${fullName}`;
	});

	if (type === 'file') {
		elementHTML.inputs.ext.addEventListener('keyup', (e) => {
			ext = String(e.target.value);
			elementHTML.labels.name.textContent = `${name + ext}`;
		});
	}
}


module.exports = createFileOrFolder;
