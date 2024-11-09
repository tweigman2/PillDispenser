const { contextBridge, ipcRenderer } = require('electron');
const { execFileSync, execFile, spawn } = require('node:child_process');

contextBridge.exposeInMainWorld('api', {
    // execCmd() {
    //     let out = execFileSync("src/firmware/example"); 
    //     return out.toString();
    // },
    execCommand: async (command, args) => {
        const {stdout, stderr} = await execFile(command, args);
        return stdout.toString();
    },
    sendCommand: (command, args) => ipcRenderer.send('spawn-command', command, args),
    onOutput: (callback) => ipcRenderer.on('command-output', (_event, data) => callback(data)),
    spawnCmd: spawn
});