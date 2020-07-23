/* eslint-disable no-undef */

const $select = document.querySelector.bind(document);
const $selectById = document.getElementById.bind(document);

const HtmlElements = {
	titleBar: $select('.title-bar'),
	titleBarNavMenu: $select('.title-bar ul'),
	leftMenu: $select('section .left-menu'),
	mainArea: $selectById('main-area'),
	configScreen: $select('.config-screen'),
	menuFolderOptions: $select('#folder-options'),
	separador: $select('section .vertical-separator'),

	buttons: {
		closeButton: $selectById('btn-close-window'),
		minimizeButton: $selectById('btn-minimize-window'),
		maximizeButton: $selectById('btn-maximize-window'),
		previousDirectory: $select('header .title-bar .previous-directory'),
		nextDirectory: $select('header .title-bar .next-directory'),
		saveTagsButton: $select('#btn-save-tags'),

	},

};


module.exports = { HtmlElements };
