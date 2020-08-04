/* eslint-disable no-undef */
const path = require('path');

const { Elements } = require('../../../../utils/Elements');
const { getTagsConfig } = require('../../../../utils/settings');



function navigationByTag(f) {
	const itens = [...document.querySelectorAll('#content-tag-left-menu ul li')];

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
	const ul = Elements.leftMenu.querySelector('#content-tag-left-menu ul');

	const template = Elements.leftMenu.querySelector('#tag-left-menu');
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




module.exports = {
	loadMenuTags,
};
