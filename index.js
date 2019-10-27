const {
  BrowserWindow,
  app,
  dialog,
  ipcMain,
  session,
  net
} = require("electron")
const path = require("path")
let win = null

app.on("ready", () => {
  console.log("loaded app")
  //session.defaultSession.clearStorageData([], (data) => {})

  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },

    minWidth: 1280,
    minHeight: 720,
    show: false,
    icon: __dirname + "/build/icons/1024x1024.png"
  })
  win.loadURL(`https://web.whatsapp.com/`, {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0"
  })
  win.maximize()
  win.on("ready-to-show", function() {
    win.show()
  })
})
