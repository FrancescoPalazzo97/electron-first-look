const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        ipcRenderer.send('test', { nome: 'Francesco', cognome: 'Palazzo' });
    })
})