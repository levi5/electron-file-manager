// eslint-disable-next-line strict
const { app, BrowserWindow, globalShortcut } = require('electron');
const { resolve } = require('path');



let mainWindow = null;

function reload() {
	mainWindow.webContents.reload();
}
function toggleDevTools() {
	mainWindow.webContents.toggleDevTools();
}

function createShortCuts() {
	globalShortcut.register('f12', toggleDevTools);

	globalShortcut.register('f5', reload);
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 620,
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		frame: false,

		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},

	});
	createShortCuts();
	// mainWindow.webContents.toggleDevTools();
	const path = resolve(__dirname, '..', 'public', 'index.html');
	mainWindow.loadURL(`file://${path}`);

	mainWindow.on('closed', () => { mainWindow = null; });
};


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});




app.on('ready', () => {
	setTimeout(() => {
		createWindow();
	}, 800);
});
