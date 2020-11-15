process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const electron = require('electron')
var path = require('path')
const { app, BrowserWindow } = require('electron')
function createWindow () {
  // var http = require(`${__dirname}/http`)
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 620,
    icon: path.join(__dirname, 'pages/assents/mcpe.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false
    }
  })
  win.loadFile(`${__dirname}/pages/index.html`)
  win.on('close', function(e) {const choice = require('electron').dialog.showMessageBoxSync(this,{type: 'question', buttons: ['Yes', 'No'], title: 'Confirm', message: 'Did you stop the server?' });
    if (choice === 1) {
      e.preventDefault();
    }
  });
}
app.whenReady().then(createWindow);
// app.quit();
//  app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  app.quit();
  // process.exit();
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
// App close handler
app.on('before-quit', function() {
  var exec = require('child_process').exec;
  var child = exec('FOR /F "usebackq tokens=2" %i% IN (`tasklist ^| findstr /r /b "bedrock_server*[.]exe"`) DO taskkill /pid /F %i%', {
      detached: false,
      shell: true
  });
  child.stdout.on('data', function (data) {
      console.log('kill all bds servers')
  });
});