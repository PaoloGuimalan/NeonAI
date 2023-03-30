const { app, BrowserWindow, ipcMain } = require('electron')
const find = require('find-process');

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.removeMenu()

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // const win2 = new BrowserWindow({
  //   width: 400,
  //   height: 400,
  //   frame: true,
  //   fullscreen: false,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     enableRemoteModule: true
  //   }
  // })

  // win2.removeMenu()
  // win2.loadURL(
  //   isDev
  //     ? `file://${path.join(__dirname, '../public/voiceCatcherModule/index.html')}`
  //     : `file://${path.join(__dirname, '../build/voiceCatcherModule/index.html')}`
  // )

  // require("electron").shell.openExternal("google.com")
  // window.open('./voiceCatcherModule/index.html','winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('before-quit' , (e) => {
    find('port', 3000)
      .then(function(list) {
      if(list[0] != null){
          process.kill(list[0].pid, 'SIGHUP');
      }
    }).catch((e) => {
        console.log(e.stack || e);
    })
});

ipcMain.on('closeApp', (evt, arg) => {
  app.exit(0)
});
