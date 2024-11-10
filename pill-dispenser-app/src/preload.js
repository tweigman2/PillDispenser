const { contextBridge, ipcRenderer } = require('electron');
const { execFileSync, execFile } = require('node:child_process');

contextBridge.exposeInMainWorld('api', {
    // execCmd() {
    //     let out = execFileSync("src/firmware/example"); 
    //     return out.toString();
    // },
    execCommand: (command, args) => {
        try {
            let out = execFileSync(command, args);
            return out.toString();
        } catch (err) {

        }
    },
    sendCommand: (command, args) => ipcRenderer.send('spawn-command', command, args),
    onOutput: (callback) => ipcRenderer.on('command-output', (_event, data) => callback(data))
});