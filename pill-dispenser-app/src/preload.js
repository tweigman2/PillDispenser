const { contextBridge, ipcRenderer } = require('electron');
const { execFileSync } = require('node:child_process');

contextBridge.exposeInMainWorld('api', {
    // spawnCmd: (callback) => {
    spawnCmd() {
        let out = execFileSync("src/firmware/example"); 
        return out.toString();
            // ipcRenderer.send('output', stdout.toString());
            // console.error("Stderr");
            // console.error(stderr);
        
        // ipcRenderer.on('output', (_event, value) => callback(value))
    }
});