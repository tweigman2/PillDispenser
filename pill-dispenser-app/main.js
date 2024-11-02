const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require('node:child_process');
const { open, openSync } = require("node:fs");
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "src/preload.js"),
            nodeIntegration: true
        }
    });
    
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipcMain.on('spawn-command', (event, command, args) => {
    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
        event.reply('command-output', data.toString());
    })
});