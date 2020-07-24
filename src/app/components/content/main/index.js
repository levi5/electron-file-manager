const fileSystem = require('../../../../utils/fileSystem');
const userInterface = require('../../../../utils/userInterface');
const search = require('../../../../utils/search');
const { loadMenuTags } = require('../left-menu/index');
const { rename } = require('../modal/rename/index');



function main() {
	const folderPath = fileSystem.getUsersHomeFolder();

	userInterface.openFolder(folderPath);
	loadMenuTags();
	rename();


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
