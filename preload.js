const { contextBridge, ipcRenderer, dialog } = require('electron')

contextBridge.exposeInMainWorld('init', {
    store: () => ipcRenderer.invoke('store')
})

contextBridge.exposeInMainWorld('liveryPath', {
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config)
});

const IPCS = {
    steamPath: (message) => ipcRenderer.send('steamPath', message)
}

contextBridge.exposeInMainWorld('api', IPCS)