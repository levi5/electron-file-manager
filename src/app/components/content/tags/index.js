/* eslint-disable no-undef */
const { Elements } = require('../../../../utils/Elements');
const { saveTagConfig } = require('../../../../utils/settings');
const { getImage } = require('../../../../utils/userInterface');
const { loadMenuTags } = require('../left-menu/index');


function getTagData() {
	const filetype = document.querySelector('#createTags label[name=filetype]').textContent;
	const filename = document.querySelector('#createTags label[name=filename]').textContent;
	const filePath = document.querySelector('#createTags label[name=filePath]').textContent;
	const tagIcon = document.querySelector('#createTags .tag-icon');
	const tagname = document.querySelector('#createTags label[name=tagname]');
	const tagEmoji = document.querySelector('#createTags label[name=tagEmoji]').textContent;

	const { backgroundColor: iconBackgroundColor } = tagIcon.style;
	let { color: tagNameColor } = tagname.style;
	const tagName = tagname.textContent;

	tagNameColor = tagNameColor || '#FFF';

	return {
		filename,
		filetype,
		filePath,
		iconBackgroundColor,
		tagName,
		tagNameColor,
		tagEmoji,
	};
}



function readTag(filepath) {
	const itens = [...Elements.mainArea.querySelectorAll('.item')];

	itens.map((item) => {
		const dataPath = item.getAttribute('data-path');

		if (dataPath === filepath) {
			const iconBackgroundColor = item.querySelector('.tag .tag-icon').style.backgroundColor;
			const tagNameColor = item.querySelector('.tag .tag-name').style.color;
			const tagName = item.querySelector('.tag .tag-name').textContent;
			const tagEmoji = item.querySelector('.tag .tag-emoji').textContent;

			document.querySelector('#createTags .tag-icon').style.backgroundColor = iconBackgroundColor;
			document.querySelector('#createTags label[name=tagname]').style.color = tagNameColor;
			document.querySelector('#createTags label[name=tagname]').textContent = tagName;
			document.querySelector('#createTags label[name=tagEmoji]').textContent = tagEmoji;
			document.querySelector('input[name=inputTag]').value = tagName;
			document.querySelector('input[name=inputEmoji]').value = tagEmoji;
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
				Elements.configScreen.querySelector(elementTwo).style.color = backgroundColor;
			} else if (styleOption === 'backgroundColor') {
				Elements.configScreen.querySelector(elementTwo).style.backgroundColor = backgroundColor;
			} else {
				console.log('error options');
			}
		});
		return true;
	});
}


async function saveTag() {
	const dataTag = await getTagData();
	if (dataTag) {
		const {
			filePath, iconBackgroundColor, tagNameColor, tagEmoji,
		} = dataTag;
		const item = document.querySelector(`.item[data-path="${filePath}"]`);
		item.querySelector('.tag .tag-name').style.color = tagNameColor;
		item.querySelector('.tag .tag-icon').style.backgroundColor = iconBackgroundColor;
		item.querySelector('.tag .tag-emoji').textContent = tagEmoji;
	}

	await saveTagConfig(dataTag);
}


function setTagCreateScreenValues(filename, filePath, filetype) {
	Elements.configScreen.querySelector('label[name=filename]').textContent = `${filename}`;
	Elements.configScreen.querySelector('label[name=filetype]').textContent = `${filetype}`;
	Elements.configScreen.querySelector('label[name=filePath]').textContent = `${filePath}`;
}

function load() {
	const elementHtmlTagName = ['#tag-name-content-options .tag-content-options-colors', 'label[name=tagname]'];
	const elementHtmlTagIcon = ['#tag-options-colors-icon  .tag-content-options-colors', '#tag--tag-icon'];

	setFontColorTag(elementHtmlTagName[0], elementHtmlTagName[1], 'color');
	setFontColorTag(elementHtmlTagIcon[0], elementHtmlTagIcon[1], 'backgroundColor');
}




Elements.tag.buttons.createTag.addEventListener('click', async () => {
	const filename = await String(Elements.main.folder.menu.options.getAttribute('data-name'));
	const filetype = await String(Elements.main.folder.menu.options.getAttribute('data-type'));
	const filePath = await String(Elements.main.folder.menu.options.getAttribute('data-path'));
	const extname = await String(Elements.main.folder.menu.options.getAttribute('data-extname'));

	const url = getImage({ extname, type: filetype });

	readTag(filePath);
	setTagCreateScreenValues(filename, filePath, filetype);

	Elements.tag.image.imgPreview.setAttribute('src', url);
	Elements.configScreen.classList.toggle('on');
});




document.getElementById('btn-select-tag-color').addEventListener('click', async () => {
	Elements.configScreen.querySelector('#tag-options-colors-icon').classList.remove('on');
	Elements.configScreen.querySelector('#tag-name-content-options').classList.toggle('on');
});




document.getElementById('btn-close-modal-config').addEventListener('click', async () => {
	Elements.configScreen.classList.toggle('on');
});




function setInputValueElement(input, elementName1, elementName2) {
	const filepath = String(document.querySelector('#folder-options').getAttribute('data-path'));
	const tagName = input.value;
	const item = document.querySelector(`.item[data-path="${filepath}"]`);

	item.querySelector(elementName1).textContent = tagName;
	Elements.configScreen.querySelector(elementName2).textContent = tagName;
}



const inputTag = document.querySelector('input[name=inputTag]');
const inputTagEmoji = document.querySelector('input[name=inputEmoji]');

inputTag.addEventListener('keyup', async (_e) => {
	await setInputValueElement(inputTag, '.tag .tag-name', 'label[name=tagname]');
});

inputTagEmoji.addEventListener('keyup', async (_e) => {
	await setInputValueElement(inputTagEmoji, '.tag .tag-emoji', 'label[name=tagEmoji]');
});



Elements.tag.buttons.saveTag.addEventListener('click', async () => {
	await saveTag();
	await loadMenuTags();
	Elements.configScreen.classList.toggle('on');
});




document.getElementById('tag--button-select-icon-color').addEventListener('click', async () => {
	Elements.configScreen.querySelector('#tag-name-content-options').classList.remove('on');
	Elements.configScreen.querySelector('#tag-options-colors-icon').classList.toggle('on');
});



load();


module.exports = {
	setTagCreateScreenValues,
};
