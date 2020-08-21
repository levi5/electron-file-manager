/* eslint-disable no-undef */
const { Elements } = require('../../../../../utils/Elements');
const settings = require('../../../../../utils/settings');

function closeRecentItemsWindow() {
	Elements.main.options.screen.classList.toggle('on');
	Elements.main.content.screenItems.classList.toggle('off');
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
		const [date, time] = String(accessDate).split(' ');

		clone.querySelector('article').setAttribute('key', path);
		clone.querySelector('article').setAttribute('data-name', name);
		clone.querySelector('article').setAttribute('data-type', type);
		clone.querySelector('article').setAttribute('data-access', access);
		clone.querySelector('article').setAttribute('data-accessDate', accessDate);

		clone.querySelector('label[name=name]').textContent = `${name}`;
		clone.querySelector('label[name=path]').textContent = `Path: ${path}`;
		clone.querySelector('label[name=type]').textContent = `Tipo: ${type}`;
		clone.querySelector('label[name=access]').textContent = `Acessos: ${access}`;
		clone.querySelector('label[name=date]').textContent = `Data: ${date}`;
		clone.querySelector('label[name=time]').textContent = `Hora: ${time}`;

		clone.querySelector('article').querySelector('#btn-go-recent-item').addEventListener('click', () => {
			open(path, type, loadDirectory);
		});

		clone.querySelector('article').querySelector('#btn-remove-recent-item').addEventListener('click', async () => {
			await settings.removeRecentDirectories(path, 'one');
			return createElementsOnTheRecentScreen(loadDirectory);
		});

		ul.appendChild(clone);
		return true;
	});
}

async function removeAll(loadDirectory) {
	const btnRemoveAll = document.querySelector('#recent-screen .preview button');
	btnRemoveAll.addEventListener('click', async () => {
		await settings.removeRecentDirectories(null, 'all');
		await createElementsOnTheRecentScreen(loadDirectory);
	});
}


function RecentScreen(loadDirectory) {
	createElementsOnTheRecentScreen(loadDirectory);
	removeAll(loadDirectory);
}


module.exports = {
	RecentScreen,
};
