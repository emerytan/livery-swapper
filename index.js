const { app, BrowserWindow, webContents, ipcMain, dialog } = require('electron')
const path = require('path')
const Store = require('electron-store')
const store = new Store()
const { checkFiles } = require('./test.js')
let win = null
let steamPath = 'dead'
let overridePath = './Vehicles/Textures/CustomLiveries/Overrides/formula_usa_2023'
let fullPath = ''

store.set('overridePath', overridePath)

if (store.get('steamPath') !== undefined) {
    steamPath = store.get('steamPath')
    fullPath = path.join(steamPath, overridePath)
    checkFiles(fullPath)
}


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
    // win.webContents.openDevTools()
}


app.whenReady().then(() => {
    ipcMain.handle('store', () => fullPath)
    ipcMain.handle('dialog', (event, method, params) => {
        return dialog[method](params)
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


// IPCS
ipcMain.on('steamPath', (event, msg) => {
    console.log(msg)
    steamPath = msg.steamPath
    fullPath = path.join(steamPath, overridePath)
    store.set('steamPath', fullPath)
    console.log(fullPath)
})


// squirrel shit
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

