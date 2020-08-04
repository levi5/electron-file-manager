const fileSystem = require('../../../../utils/fileSystem');
const userInterface = require('../../../../utils/userInterface');
const search = require('../../../../utils/search');
const { loadMenuTags } = require('../left-menu/index');
const { rename } = require('../modal/rename/index');
const optionsBar = require('../../options-bar/index');



function main() {
	const folderPath = fileSystem.getUsersHomeFolder();

	userInterface.loadDirectory(folderPath);
	loadMenuTags(userInterface.loadDirectory);
	optionsBar.viewHiddenFiles();
	rename(userInterface.loadDirectory);


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
