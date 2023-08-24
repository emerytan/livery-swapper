const { contextBridge, ipcRenderer, dialog } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})

contextBridge.exposeInMainWorld('liveryPath', {
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config)
  });