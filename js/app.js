const serverMessages = document.getElementById('serverMessages')
let steamPath

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
