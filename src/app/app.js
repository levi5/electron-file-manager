const fileSystem = require('../utils/fileSystem');
const userInterface = require('../utils/userInterface');
const search = require('../utils/search');

const { header } = require('./components/tittleBar/index');
const leftMenu = require('./components/content/left-menu/index');
const optionsBar = require('./components/options-bar/index');

const { createFolder } = require('./components/content/Modal/CreateFolder/index');
const { rename } = require('./components/content/Modal/Rename/index');



function main() {
	const folderPath = fileSystem.getUsersHomeFolder();

	header();
	leftMenu.loadFunctions(userInterface.loadDirectory);

	userInterface.loadDirectory(folderPath);

	optionsBar.optionsBarFunctions();
	rename(userInterface.loadDirectory);
	createFolder(userInterface.loadDirectory);


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
