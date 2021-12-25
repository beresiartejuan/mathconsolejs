const { app, BrowserWindow, Menu } = require('electron');

// Menu 
let template = [
    {
        'label': 'File',
        'submenu': [
            { 'role': 'quit' }
        ]
    },
    {
        'label': 'Edit',
        'submenu': [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        'label': 'Console',
        'submenu': [
            { 'label': 'new console' }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('./views/index.html');
    Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});