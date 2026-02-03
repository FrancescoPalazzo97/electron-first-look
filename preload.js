import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const convertPhoto = () => {
        ipcRenderer.send('img:converted');
    }

    const btn = document.getElementById('btn');
    btn.addEventListener('click', convertPhoto);

    const minimizeBtn = document.getElementById('minimize-btn');
    const closeBtn = document.getElementById('close-btn');
    const maximizeBtn = document.getElementById('maximize-btn');

    minimizeBtn.addEventListener('click', () => {
        ipcRenderer.send('window:minimize');
    });

    closeBtn.addEventListener('click', () => {
        ipcRenderer.send('window:close');
    });

    maximizeBtn.addEventListener('click', () => {
        ipcRenderer.send('window:maximize');
    });

    ipcRenderer.on('img:convertita', () => {
        const mess = document.getElementById('mess');
        mess.innerText = 'Immagine convertita con successo'
    })
})