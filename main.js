const { createPublicKey } = require('crypto');
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');
var child = require('child_process').execFile;
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label: 'Refresh Data',
        click(){
          fetchData();
        }
      },
      {
        label: 'Exit',
        click(){
          app.quit();
        }
      }
    ]
  }
];

app.whenReady().then(() => {
    createWindow()
  
    app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    })
})

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
}

//Runs Python.exe to create/update json data
//TODO: Find a way to integrate a progress bar with python function
function fetchData() {
  exePath = path.join(__dirname, 'UpdateGenshinData')
  child(exePath);
}
