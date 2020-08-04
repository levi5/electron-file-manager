/* eslint-disable no-undef */

const $select = document.querySelector.bind(document);
// const $selectAll = document.querySelectorAll.bind(document);
const $selectById = document.getElementById.bind(document);

const Elements = {

	leftMenu: $select('section .left-menu'),
	mainArea: $selectById('main-area'),
	configScreen: $select('.config-screen'),
	separador: $select('section .vertical-separator'),

	header: {
		buttons: {
			close: $selectById('btn-close-window'),
			minimize: $selectById('btn-minimize-window'),
			maximize: $selectById('btn-maximize-window'),
			previousDirectory: $select('header .title-bar .previous-directory'),
			nextDirectory: $select('header .title-bar .next-directory'),
		},
		menu: {
			directory: $select('.title-bar ul'),
		},
		bar: {

			title: $select('.title-bar'),
		},
	},
	main: {
		folder: {
			menu: {
				options: $select('#folder-options'),
			},
		},
		global: {
			menu: {
				options: $select('#main-area-menu-global'),
			},

		},
		items: {

		},

	},
	optionsBar: {
		buttons: {
			viewHiddenFiles: $select('#view-hidden-files'),
		},


	},
	tag: {
		buttons: {
			createTag: $selectById('btn-create-tag'),
			saveTag: $select('#btn-save-tags'),
		},
		image: {
			imgPreview: $select('#createTag-img-preview'),
		},
	},
	modal: {
		rename: {
			screen: $select('#modal-rename'),
			inputs: {
				renameItem: $select('#modal-rename input[name=rename-file]'),
			},
		},

	},


};


module.exports = { Elements };
