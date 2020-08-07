const fileSystem = require('../../../../utils/fileSystem');
const userInterface = require('../../../../utils/userInterface');
const search = require('../../../../utils/search');
const { loadMenuTags } = require('../left-menu/index');
const { createFolder } = require('../Modal/CreateFolder/index');
const { rename } = require('../Modal/Rename/index');
const optionsBar = require('../../options-bar/index');



function main() {
	const folderPath = fileSystem.getUsersHomeFolder();

	userInterface.loadDirectory(folderPath);
	loadMenuTags(userInterface.loadDirectory);
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

main();
