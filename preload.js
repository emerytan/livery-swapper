const { contextBridge, ipcRenderer, dialog } = require('electron')


contextBridge.exposeInMainWorld('liveryPath', {
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config)
});