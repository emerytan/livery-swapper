const { app, BrowserWindow, webContents, ipcMain, dialog } = require('electron')
const path = require('path')
const {
    StringDecoder
} = require('string_decoder')
const decoder = new StringDecoder('utf8')
let win = null
let appState


if (handleSquirrelEvent(app)) {
    return
}

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('./index.html')
    win.webContents.openDevTools()
}


app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('dialog', (event, method, params) => {       
        console.log(dialog[method](params));
        return dialog[method](params);
      })
    
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('view loaded', () => {
    console.log('ipc: view loaded');
    win.webContents.send('init view', 'CASS Livery Swapper 0.0.1')
})

ipcMain.on('set basepath', (event, msg) => {

})

ipcMain.on('select-dirs', () => {
    console.log('select dirs');
})

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);
    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) { }
        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-uninstall':
            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-obsolete':
            application.quit();
            return true;
    }
}

