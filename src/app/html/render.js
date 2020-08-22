/* eslint-disable func-names */
/* eslint-disable no-undef */
const { Elements } = require('../../utils/Elements');
const { header } = require('../components/tittleBar/html');
const { textColors, iconColors } = require('./Tags/cores');
const { menu } = require('../components/content/left-menu/html');
const AddFolderToMenu = require('../components/content/Modal/AddFolderToMenu/html');
const main = require('../app');




window.onload = ((async () => {
	Elements.header.screen.innerHTML = header;
	Elements.main.leftMenu.screen.innerHTML = menu;
	Elements.modal.addFolderToMenu.screen.innerHTML = AddFolderToMenu.HTMLCodeBlock;
	document.querySelector('#tag-name-content-options').innerHTML = textColors;
	document.querySelector('#tag-options-colors-icon').innerHTML = iconColors;
	await main();
})());
