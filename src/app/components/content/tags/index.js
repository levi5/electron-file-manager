/* eslint-disable no-undef */
const path = require('path');
const { remote } = require('electron');

const { HtmlElements } = require('../../../../utils/Elements');
const { saveTagConfig } = require('../../../../utils/settings');
const { loadMenuTags } = require('../left-menu/index');


function getTagData() {
	const filetype = document.querySelector('#createTags label[name=filetype]').textContent;
	const filename = document.querySelector('#createTags label[name=filename]').textContent;
	const filePath = document.querySelector('#createTags label[name=filePath]').textContent;
	const tagIcon = document.querySelector('#createTags .tag-icon');
	const tagname = document.querySelector('#createTags label[name=tagname]');


	let { backgroundColor: iconBackgroundColor } = tagIcon.style;
	let { color: tagNameColor } = tagname.style;
	let tagName = tagname.textContent;

	iconBackgroundColor = iconBackgroundColor || '#FFF';
	tagNameColor = tagNameColor || '#FFF';
	tagName = tagName || 'tag';

	return {
		filename,
		filetype,
		filePath,
		iconBackgroundColor,
		tagName,
		tagNameColor,
	};
}



function readTag(filepath) {
	const itens = [...document.querySelectorAll('.item')];

	itens.map((item) => {
		const dataPath = item.getAttribute('data-path');

		if (dataPath === filepath) {
			const iconBackgroundColor = item.querySelector('.tag .tag-icon').style.backgroundColor;
			const tagNameColor = item.querySelector('.tag .tag-name').style.color;
			const tagName = item.querySelector('.tag .tag-name').textContent;

			document.querySelector('#createTags .tag-icon').style.backgroundColor = iconBackgroundColor;
			document.querySelector('#createTags label[name=tagname]').style.color = tagNameColor;
			document.querySelector('#createTags label[name=tagname]').textContent = tagName;
			document.querySelector('input[name=inputTag]').value = tagName;
		}
		return true;
	});
}



function setFontColorTag(elementOne, elementTwo, styleOption) {
	const colors = [...document.querySelectorAll(elementOne)];

	colors.map((color) => {
		color.addEventListener('click', (e) => {
			const { backgroundColor } = e.target.style;

			if (styleOption === 'color') {
				HtmlElements.configScreen.querySelector(elementTwo).style.color = backgroundColor;
			} else if (styleOption === 'backgroundColor') {
				HtmlElements.configScreen.querySelector(elementTwo).style.backgroundColor = backgroundColor;
			} else {
				console.log('error options');
			}
		});
		return true;
	});
}


function saveTag() {
	const dataTag = getTagData();
	saveTagConfig(dataTag);
}




function load() {
	const elementHtmlTagName = ['#tag-name-content-options .tag-content-options-colors', 'label[name=tagname]'];
	const elementHtmlTagIcon = ['#tag-options-colors-icon  .tag-content-options-colors', '#tag--tag-icon'];
	setFontColorTag(elementHtmlTagName[0], elementHtmlTagName[1], 'color');
	setFontColorTag(elementHtmlTagIcon[0], elementHtmlTagIcon[1], 'backgroundColor');
}




document.getElementById('btn-create-tag').addEventListener('click', async () => {
	const filename = await String(document.querySelector('#folder-options').getAttribute('data-name'));
	const filetype = await String(document.querySelector('#folder-options').getAttribute('data-type'));
	const filePath = await String(document.querySelector('#folder-options').getAttribute('data-path'));

	readTag(filePath);


	const url = path.resolve(__dirname, '..', '..', '..', '..', '..', 'public', 'assets', 'icons', 'main-area', `${filetype}.svg`);
	document.querySelector('#createTag-img-preview').setAttribute('src', url);

	HtmlElements.configScreen.querySelector('label[name=filename]').textContent = `${filename}`;
	HtmlElements.configScreen.querySelector('label[name=filetype]').textContent = `${filetype}`;
	HtmlElements.configScreen.querySelector('label[name=filePath]').textContent = `${filePath}`;

	HtmlElements.configScreen.classList.toggle('on');
});



document.getElementById('btn-select-tag-color').addEventListener('click', async () => {
	HtmlElements.configScreen.querySelector('#tag-name-content-options').classList.toggle('on');
});

document.getElementById('btn-close-modal-config').addEventListener('click', async () => {
	HtmlElements.configScreen.classList.toggle('on');
});


const inputTag = document.querySelector('input[name=inputTag]');

inputTag.addEventListener('keyup', async (_e) => {
	const filepath = await String(document.querySelector('#folder-options').getAttribute('data-path'));
	const tagName = inputTag.value;


	const item = document.querySelector(`.item[data-path="${filepath}"]`);

	item.querySelector('.tag .tag-name').textContent = tagName;
	HtmlElements.configScreen.querySelector('label[name=tagname]').textContent = tagName;
});



HtmlElements.buttons.saveTagsButton.addEventListener('click', async () => {
	const window = remote.getCurrentWindow();
	saveTag();
	loadMenuTags();
	HtmlElements.configScreen.classList.toggle('on');
	window.reload();
});




document.getElementById('tag--button-select-icon-color').addEventListener('click', async () => {
	HtmlElements.configScreen.querySelector('#tag-options-colors-icon').classList.toggle('on');
});



load();
