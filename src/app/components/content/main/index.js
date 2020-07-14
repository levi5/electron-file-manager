const fileSystem = require('../../../../utils/fileSystem');
const userInterface = require('../../../../utils/userInterface');
const search = require('../../../../utils/search');

function main() {
	const folderPath = fileSystem.getUsersHomeFolder();
	userInterface.loadDirectory(folderPath);

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
