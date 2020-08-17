/* eslint-disable no-undef */
const path = require('path');

const { Elements } = require('../../../../utils/Elements');
const { getTagsConfig, createLeftMenuOptions } = require('../../../../utils/settings');
const { RecentScreen } = require('../main/Recents/index');


async function createLeftMenuElementsInHTML(homedir) {
	const options = await createLeftMenuOptions(homedir);

	const ul = Elements.main.leftMenu.screen.querySelector('.left-menu-content ul');
	const template = Elements.main.leftMenu.screen.querySelector('.left-menu-content ul #left-menu-template');
	ul.textContent = '';

	ul.appendChild(template);


	options.map((option) => {
		const clone = document.importNode(template.content, true);

		let { id } = option;
		id = (id.replace(/[$]/g, '')).toLowerCase();


		const src = path.resolve(__dirname, '..', '..', '..', '..', '..', 'public', 'assets', 'icons', 'left-menu', `${id}.png`);

		clone.querySelector('li').setAttribute('id', `${id}-button`);
		clone.querySelector('li').setAttribute('data-path', option.path);
		clone.querySelector('li').setAttribute('navigation', option.navigation);
		clone.querySelector('li img').setAttribute('src', src);
		clone.querySelector('li img').setAttribute('alt', option.name);
		clone.querySelector('li').append(option.name);



		ul.appendChild(clone);


		return true;
	});
}


function navigationByTag(f) {
	const itens = [...Elements.main.leftMenu.screen.querySelectorAll('#content-tag-left-menu ul li')];

	itens.map((item) => {
		item.addEventListener('click', () => {
			let filePath = item.getAttribute('data-path');
			const filetype = item.getAttribute('data-type');
			if (filetype === 'file') {
				filePath = path.dirname(filePath);
			} else {
				filePath = path.resolve(filePath, '..');
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

async function loadFunctions(f, homedir) {
	await createLeftMenuElementsInHTML(homedir);
	await loadMenuTags(f);
	await getRecentDirectories(f);
}

module.exports = {
	loadFunctions,
	loadMenuTags,
};
