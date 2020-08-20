const { rename } = require('./Rename/index');
const { loadFolderToMenu } = require('./AddFolderToMenu/index');




function modalLoadFunctions(functionLoadDirectory, functionLoadMenu) {
	rename(functionLoadDirectory);
	loadFolderToMenu(functionLoadMenu);
}

module.exports = modalLoadFunctions;
