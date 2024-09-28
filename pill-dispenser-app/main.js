const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});