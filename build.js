var electronInstaller = require('electron-winstaller');

var settings = {
    appDirectory: './built/CO3 Masking Control-win32-x64',
    outputDirectory: './installer',
    authors: 'Company3',
    exe: 'CO3 Masking Control.exe',
    version: '0.0.1',
    noMsi: true
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("Installer succesfully created !");
}, (e) => {
    console.log(`Build failed: ${e.message}`)
});
