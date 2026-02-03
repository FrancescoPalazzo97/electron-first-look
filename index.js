import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});