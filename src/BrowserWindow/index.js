import { BrowserWindow } from "@electron/remote";
import { join } from 'path';
const winUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:52916/'
    : `file://${__dirname}/index.html`

let windowsBox = new Map() // 窗口容器

class Win {
    openWin(option) {
        if (!option.name) {
            throw new Error('请定义窗口name')
        }
        if (windowsBox.has(option.name)) {
            if (windowsBox.get(option.name).isMinimized()) {
                windowsBox.get(option.name).restore()
            }
            windowsBox.get(option.name).focus()
            return
        }
        let browserWindow = new BrowserWindow({
            width: option.width,
            height: option.height,
            minWidth: option.width,
            minHeight: option.height,
            show: false,
            icon: join(__static, './logo.ico'),
            titleBarStyle: 'hidden',
            titleBarOverlay: {
                color: '#1677ff',
                symbolColor: '#ffffff',
                height: 36
            },
            backgroundColor: '#f0f2f5',
            webPreferences: {
                // 关闭拼写矫正
                spellcheck: false,
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false
            }
        })

        browserWindow.loadURL(winUrl + option.url)
        browserWindow.once('ready-to-show', () => {
            browserWindow.show()
            windowsBox.set(option.name, browserWindow)
            // browserWindow.webContents.openDevTools()
        })
        browserWindow.on('close', () => {
            browserWindow = null
            windowsBox.delete(option.name)
        })
    }
}


export default new Win()