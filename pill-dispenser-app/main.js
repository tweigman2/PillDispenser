const { app, BrowserWindow, ipcMain } = require("electron");
// const { contextBridge } = require('electron');
const { execFile } = require('node:child_process');
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
    // const proc = spawn("src/firmware/example");
    // proc.stdout.on('data', (data) => {
    //     win.webContents.send('output', data);
    // });
    
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
}

// function handleSpawn() {
//     return {output: spawn("src/firmware/example").stdout};
// }

// const proc = spawn("src/firmware/example");
// proc.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// })

// contextBridge.exposeInMainWorld('nodeSpawn', {
//     // call(command) {
//     //     return spawn(command);
//     // }
//     call: (func) => ipcRenderer.on()
// });

app.whenReady().then(() => {
    ipcMain.on('idk', (_event, value) => {
        // console.log("Value: " + value);
    })
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});