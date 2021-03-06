/* eslint-disable no-undef */

const $select = document.querySelector.bind(document);
// const $selectAll = document.querySelectorAll.bind(document);
const $selectById = document.getElementById.bind(document);

// statically created elements

const Elements = {

	mainArea: $selectById('main-area'),
	configScreen: $select('.config-screen'),
	separador: $select('section .vertical-separator'),

	header: {
		screen: $select('header'),
	},
	main: {
		screen: $selectById('main-area'),
		content: {
			screenItems: $select('#main-area #items-content'),
			folder: {
				menu: {
					options: $select('#folder-options'),
					buttons: {
						rename: $select('#folder-options #rename-item'),
						addFolderToMenu: $select('#folder-options #btn-add-folder-menu'),
						details: $select('#folder-options #btn-details-file'),
					},
				},
			},

			global: {
				menu: {
					options: $select('#main-area-menu-global'),
					buttons: {
						createFolder: $select('#btn-create-folder'),
						createFile: $select('#btn-create-file'),
					},
				},

			},
		},


		options: {
			screen: $select('#menu-content'),
		},

		leftMenu: {
			screen: $select('section .left-menu'),

		},
		details: {
			screen: $select('#main-area #details-screen'),
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
				cancel: $select('#create-folder-screen #btn-cancel-create-folder'),
			},
			inputs: {
				name: $select('#create-folder-screen input[name=folder-name]'),
			},
			labels: {
				name: $select('#create-folder-screen label[name=name-preview]'),
			},
		},
		createFile: {
			screen: $select('.modal #create-file-screen'),
			inputs: {
				name: $select('#create-file-screen input[name=file-name]'),
				ext: $select('#create-file-screen input[name=file-ext]'),
			},
			labels: {
				name: $select('#create-file-screen label[name=name-preview]'),
			},
			buttons: {
				create: $select('#create-file-screen #btn-create-file'),
				cancel: $select('#create-file-screen #btn-cancel-create-file'),
			},

		},
		addFolderToMenu: {
			screen: $select('.modal #add-folder-to-menu'),
		},

	},


};


module.exports = { Elements };
