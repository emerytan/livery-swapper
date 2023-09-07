const serverMessages = document.getElementById('serverMessages')
const info = document.getElementById('info')
let steamPath

const checkStore = async () => {
    const storePath = await window.init.store()
    if (storePath === 'dead') {
        info.innerText = `Yo!  We need the steam path For AMS2.  
        Click the button over there to set it...`
    } else {
        info.innerText = `this is your persistent steam path for AMS2: 
        ${storePath}`
    }
}

checkStore()

const dialogConfig = {
    title: 'Set AMS2 Steam Path',
    buttonLabel: 'Send it',
    properties: ['openDirectory']
};

document.getElementById('steamPath').addEventListener('click', (event) => {
    liveryPath.openDialog('showOpenDialog', dialogConfig)
    .then(result => {
        steamPath = result.filePaths[0]
        serverMessages.innerText = steamPath
        window.api.steamPath({steamPath: steamPath})
    });
})
