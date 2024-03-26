import { app, BrowserWindow, Menu, globalShortcut, ipcMain, dialog, shell } from 'electron';
const path = require('path');

const winUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:52916/'
  : `file://${__dirname}/index.html`;

let mainWindow = null;

// const additionalData = { myKey: '20230710' }//进程ID
// const gotTheLock = app.requestSingleInstanceLock(additionalData)
// if (!gotTheLock) {// 重复运行终止
//   app.exit();
// } else {
//   app.on('second-instance', () => {
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) {
//         mainWindow.restore();
//         mainWindow.focus();
//       }
//     }
//   })
// }

async function createWindow() {
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    show: false,
    icon: path.join(__static, './logo.ico'),
    frame: false,
    backgroundColor: '#f0f2f5',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // 关闭拼写矫正
      spellcheck: false,
      webSecurity: false,
      enableRemoteModule: true // 使用remote模块
    }
  })

  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);

  mainWindow.loadURL(winUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  globalShortcut.register("F4", () => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools();
    }
  });

  // mainWindow.on('close', (e) => {
  //   shell.beep();
  //   e.preventDefault()
  //   if (mainWindow.isMinimized()) {
  //     mainWindow.restore();
  //   }
  //   mainWindow.focus();
  //   mainWindow.webContents.send('close');
  // });

  // 监听全屏事件
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('winSizeChange', 'maximize');
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('winSizeChange', 'unmaximize');
  })
}

// 监听渲染进程传来的关闭
ipcMain.on("closeApp", () => {
  app.exit();
})

// 监听渲染进程传来的窗口变化
ipcMain.on("resizeWin", (event, arg) => {
  if (arg == 'maximize') {
    mainWindow.maximize();
  } else if ((arg == 'unmaximize')) {
    mainWindow.unmaximize();
  } else {
    mainWindow.minimize();
  }
})
//选择目录
ipcMain.on('choose-dir', (e) => {
  dialog.showOpenDialog(mainWindow, {
    title: '选择文件夹',
    buttonLabel: '选择文件夹',
    defaultPath: 'D:/',
    properties: ['openDirectory', 'showHiddenFiles']
  }).then(res => {
    if (!res.canceled) {
      e.returnValue = res.filePaths[0];
    } else {
      e.returnValue = null;
    }
  })
})

//选择文件
ipcMain.on('choose-file', (e, option) => {
  dialog.showOpenDialog(mainWindow, {
    title: option.title || '选择文件',
    buttonLabel: '选择文件',
    defaultPath: 'D:/',
    properties: ['openFile', 'showHiddenFiles'],
    filters: option.filters
  }).then(res => {
    if (!res.canceled) {
      e.returnValue = res.filePaths[0];
    } else {
      e.returnValue = null;
    }
  })
})

app.on('ready', async () => {
  createWindow();
})