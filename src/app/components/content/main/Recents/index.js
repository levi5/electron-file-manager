/* eslint-disable no-undef */


const { Elements } = require('../../../../../utils/Elements');
const settings = require('../../../../../utils/settings');

function closeRecentItemsWindow() {
	Elements.main.options.screen.classList.toggle('on');
	Elements.main.content.screenItems.classList.toggle('off');
}


function preview(name, path, type, access, accessDate) {
	const div = document.querySelector('#recent-screen .preview');

	div.querySelector('label[name=name]').textContent = name;
	div.querySelector('label[name=path]').textContent = path;
	div.querySelector('label[name=type]').textContent = type;
	div.querySelector('label[name=access]').textContent = access;
	div.querySelector('label[name=access-date]').textContent = accessDate;
}



function open(path, type, loadDirectory) {
	if (type === 'directory') {
		loadDirectory(path);
	}

	closeRecentItemsWindow();
}


async function createElementsOnTheRecentScreen(loadDirectory) {
	const recentesItems = await settings.getRecentDirectories();
	const template = document.querySelector('#template-recent-item');
	const ul = document.querySelector('#menu-content #recent-screen .recent-items .content');

	ul.textContent = '';
	ul.appendChild(template);

	recentesItems.map((item) => {
		const clone = document.importNode(template.content, true);
		const {
			path, name, type, access, accessDate,
		} = item;
		clone.querySelector('article').setAttribute('key', path);
		clone.querySelector('article').setAttribute('data-name', name);
		clone.querySelector('article').setAttribute('data-type', type);
		clone.querySelector('article').setAttribute('data-access', access);
		clone.querySelector('article').setAttribute('data-accessDate', accessDate);
		clone.querySelector('h4').textContent = item.name;
		clone.querySelector('p').textContent = item.path;

		clone.querySelector('article').addEventListener('click', () => {
			preview(name, path, type, access, accessDate);
		});

		clone.querySelector('article').querySelector('#btn-go-recent-item').addEventListener('click', () => {
			open(path, type, loadDirectory);
		});

		ul.appendChild(clone);

		return true;
	});
}


function RecentScreen(loadDirectory) {
	createElementsOnTheRecentScreen(loadDirectory);
}


module.exports = {
	RecentScreen,
};
