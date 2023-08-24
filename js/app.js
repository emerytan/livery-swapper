const serverMessages = document.getElementById('serverMessages')
let steamPath

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 
and Electron (v${versions.electron()})`


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
    });
})

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()