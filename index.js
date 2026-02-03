import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import webp from 'webp-converter';

webp.grant_permission();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

const createWindow = () => {
    const displays = screen.getAllDisplays();
    const firstDisplay = displays.find(d => d.bounds.x === 0 || d.bounds.y === 0);
    const secondDisplay = displays.find(d => d.bounds.x !== 0 || d.bounds.y !== 0);

    // if (secondDisplay) {
    //     win = new BrowserWindow({
    //         width: 800,
    //         height: 600,
    //         x: secondDisplay.bounds.x,
    //         y: secondDisplay.bounds.y,
    //         webPreferences: {
    //             nodeIntegration: true,
    //             contextIsolation: false,
    //             preload: path.join(__dirname, 'preload.js')
    //         }
    //     })
    // }

    if (firstDisplay) {
        win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('img:converted', async (e, data) => {
    const result = await webp.cwebp('train.jpg', 'train-converted.webp', '-q 80');
    console.log(result)
    win.webContents.send('img:convertita')
})

ipcMain.on('window:minimize', () => {
    win.minimize();
});

ipcMain.on('window:close', () => {
    win.close();
});

ipcMain.on('window:maximize', () => {
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});