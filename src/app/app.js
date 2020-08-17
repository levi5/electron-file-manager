const fileSystem = require('../utils/fileSystem');
const userInterface = require('../utils/userInterface');
const search = require('../utils/search');

const { header } = require('./components/tittleBar/index');
const leftMenu = require('./components/content/left-menu/index');
const optionsBar = require('./components/options-bar/index');


const { rename } = require('./components/content/Modal/Rename/index');
const createFileOrFolder = require('../utils/CreateFileOrFolder');



function main() {
	const folderPath = fileSystem.getUsersHomeFolder();

	header();
	leftMenu.loadFunctions(userInterface.loadDirectory, folderPath);

	userInterface.loadDirectory(folderPath);

	optionsBar.optionsBarFunctions();
	rename(userInterface.loadDirectory);
	createFileOrFolder(userInterface.loadDirectory, 'file');
	createFileOrFolder(userInterface.loadDirectory, 'directory');


	userInterface.bindSearchField((event) => {
		const query = event.target.value;

		if (query === '') {
			userInterface.resetFilter();
		} else {
			search.find(query, userInterface.filterResults);
		}
	});
}


module.exports = main;
