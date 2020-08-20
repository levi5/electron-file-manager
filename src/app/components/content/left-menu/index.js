/* eslint-disable no-use-before-define */
/* eslint-disable no-eval */
/* eslint-disable no-undef */
const { resolve, dirname } = require('path');

const { Elements } = require('../../../../utils/Elements');
const { getTagsConfig, setMenuOptions } = require('../../../../utils/settings');
const { RecentScreen } = require('../main/Recents/index');




function LeftMenuOptions(x, y, dataItem) {
	const { edit, path } = dataItem;

	let posX = x;
	let posY = y;


	if (edit) {
		const menu = document.querySelector('#left-menu-options');
		menu.classList.toggle('on');
		menu.setAttribute('path', path);


		const [main] = Elements.main.content.screenItems.getClientRects();
		const {
			top, bottom, left, right,
		} = main;

		const elementFolderOptionsWidth = parseInt(menu.clientWidth, 10);
		const elementFolderOptionsHeight = parseInt(menu.clientHeight, 10);

		const limitX = posX + elementFolderOptionsWidth + 20;
		const limitY = posY + elementFolderOptionsHeight + 20;

		if (limitX > right) posX -= (limitX - right);

		if (limitX < left) posX += (limitX - left);

		if (limitY > bottom) posY -= (limitY - bottom);

		if (limitY < top) posY += (limitY - top);

		menu.style.left = `${x}px`;
		menu.style.top = `${y}px`;
	}
}


async function openLeftMenuOptions() {
	const items = [...Elements.main.leftMenu.screen.querySelectorAll('.left-menu-content ul li')];
	items.map((item) => {
		item.addEventListener('pointerdown', async (e) => {
			if (e.buttons === 2) {
				const boolEditable = eval(String(item.getAttribute('data-edit')));
				const path = item.getAttribute('data-path');
				const defaultItem = eval(String(item.getAttribute('data-default')));
				const navigation = eval(String(item.getAttribute('data-navigation')));

				const dataItem = {
					edit: boolEditable, path, defaultItem, navigation,
				};
				await LeftMenuOptions(e.clientX, e.clientY, dataItem);
				await removeOptionLeftMenu();
			}
		});
		return true;
	});
}



async function stt(data, flag) {
	const ul = Elements.main.leftMenu.screen.querySelector('.left-menu-content #variable-items-menu');
	const template = ul.querySelector('#left-menu-template');


	const directories = await setMenuOptions(data, flag);
	ul.textContent = '';
	ul.appendChild(template);


	directories.map((directory) => {
		const clone = document.importNode(template.content, true);
		clone.querySelector('li').setAttribute('id', `${directory.id}-button`);
		clone.querySelector('li').setAttribute('data-id', directory.id);
		clone.querySelector('li').setAttribute('data-name', directory.name);
		clone.querySelector('li').setAttribute('data-path', directory.path);
		clone.querySelector('li').setAttribute('data-type', directory.type);
		clone.querySelector('li').setAttribute('data-edit', directory.edit);
		clone.querySelector('li').setAttribute('navigation', directory.navigation);
		clone.querySelector('li').setAttribute('data-icon', directory.icon);

		clone.querySelector('li img').setAttribute('src', directory.icon);
		clone.querySelector('li img').setAttribute('alt', directory.name);
		clone.querySelector('li').append(directory.name);
		ul.appendChild(clone);
		return true;
	});

	await openLeftMenuOptions();
}




async function removeOptionLeftMenu() {
	const menu = document.querySelector('#left-menu-options');
	const path = menu.getAttribute('path');

	document.querySelector('#btn-left-menu-options').addEventListener('click', () => {
		const data = [];
		const items = [...Elements.main.leftMenu.screen.querySelectorAll('.left-menu-content ul li')];
		items.map(async (item) => {
			const dataPath = String(item.getAttribute('data-path'));
			if (dataPath === path) {
				const id = String(item.getAttribute('data-id'));
				const name = String(item.getAttribute('data-name'));
				const type = String(item.getAttribute('data-type'));
				const edit = eval(item.getAttribute('data-edit'));

				const navigation = eval(item.getAttribute('data-navigation'));
				const icon = String(item.getAttribute('data-icon'));

				data.push({
					id,
					name,
					path: dataPath,
					type,
					edit,
					navigation,
					icon,
				});
				await stt(data, 'DEL');
			}
		});
	});
}



function navigationByTag(f) {
	const itens = [...Elements.main.leftMenu.screen.querySelectorAll('#content-tag-left-menu ul li')];

	itens.map((item) => {
		item.addEventListener('click', () => {
			let filePath = item.getAttribute('data-path');
			const filetype = item.getAttribute('data-type');
			if (filetype === 'file') {
				filePath = dirname(filePath);
			} else {
				filePath = resolve(filePath, '..');
			}

			f(filePath);
		});
		return true;
	});
}



async function loadMenuTags(f) {
	const tags = await getTagsConfig();

	const ul = Elements.main.leftMenu.screen.querySelector('#content-tag-left-menu ul');
	const template = ul.querySelector('#tag-left-menu');

	ul.innerHTML = '';
	ul.appendChild(template);

	tags.map((tag) => {
		const clone = document.importNode(template.content, true);
		const { iconBackgroundColor, tagName, tagNameColor } = tag;

		clone.querySelector('.tag-icon').style.backgroundColor = iconBackgroundColor;
		clone.querySelector('.tag-name').style.color = tagNameColor;
		clone.querySelector('.tag-name').textContent = tagName;
		clone.querySelector('li').setAttribute('data-path', tag.filePath);
		clone.querySelector('li').setAttribute('data-type', tag.filetype);

		ul.appendChild(clone);
		return true;
	});
	navigationByTag(f);
}



function getRecentDirectories(f) {
	Elements.main.leftMenu.screen.querySelector('#recent-button').addEventListener('click', () => {
		Elements.main.options.screen.classList.toggle('on');
		Elements.main.content.screenItems.classList.toggle('off');
		RecentScreen(f);
	});
}

async function loadFunctions(f) {
	await stt('[]', 'LOAD');
	await loadMenuTags(f);
	await getRecentDirectories(f);
}




module.exports = {
	loadFunctions,
	loadMenuTags,
	stt,
};
