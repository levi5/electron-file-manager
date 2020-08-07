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
				buttons: {
					rename: $select('#folder-options #rename-item'),
				},
			},
		},
		global: {
			menu: {
				options: $select('#main-area-menu-global'),
				buttons: {
					createFolder: $select('#btn-create-folder'),
				},
			},

		},
		items: {

		},

	},
	optionsBar: {
		buttons: {
			viewHiddenFiles: $select('#view-hidden-files'),
			newFolder: $select('#btn-new-folder'),
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
		screen: $select('.modal'),
		rename: {
			screen: $select('.modal #rename-screen'),
			inputs: {
				renameItem: $select('#rename-screen input[name=rename-file]'),
			},
		},
		createFolder: {
			screen: $select('.modal #create-folder-screen'),
			buttons: {
				create: $select('#create-folder-screen #btn-create-folder'),
			},
			inputs: {
				foldername: $select('#create-folder-screen input[name=folder-name]'),
			},
		},

	},


};


module.exports = { Elements };
