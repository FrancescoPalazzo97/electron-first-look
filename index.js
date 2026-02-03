import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import webp from 'webp-converter';

webp.grant_permission();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

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