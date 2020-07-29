/* eslint-disable no-undef */

const $select = document.querySelector.bind(document);
// const $selectAll = document.querySelectorAll.bind(document);
const $selectById = document.getElementById.bind(document);

const Elements = {
	titleBar: $select('.title-bar'),
	titleBarNavMenu: $select('.title-bar ul'),
	leftMenu: $select('section .left-menu'),
	mainArea: $selectById('main-area'),
	configScreen: $select('.config-screen'),
	modalRename: $select('#modal-rename'),
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
	optionsBar: {
		buttons: {
			btnViewHiddenFiles: $select('#view-hidden-files'),

		},


	},
	tag: {
		buttons: {
			createTag: $selectById('btn-create-tag'),
		},
		image: {
			imgPreview: $select('#createTag-img-preview'),
		},
	},
	main: {
		folder: {
			options: $select('#folder-options'),
		},
		items: {

		},

	},

};


module.exports = { Elements };
