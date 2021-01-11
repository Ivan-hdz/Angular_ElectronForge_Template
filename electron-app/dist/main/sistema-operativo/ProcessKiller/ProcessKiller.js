"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessKiller = void 0;
const child_process_1 = require("child_process");
const path = require('path');
class ProcessKiller {
    static kill() {
        if (process.env.FOR_DEV) {
            return;
        }
        else if (process.platform === 'win32') {
            child_process_1.execFile('main.exe', [
                '-verify',
                '-win',
                path.join(process.env.SRCDIR, '..', 'resources', 'whitelist-win.txt'),
                path.join(process.env.SRCDIR, '..', 'resources', 'blacklist-win.txt')
            ], {
                cwd: path.join(process.env.SRCDIR, '..', 'bin', 'manejador-procesos', 'win'),
                encoding: 'utf-8',
            }, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        else if (process.platform === 'darwin') {
            let dir = path.join(process.env.SRCDIR, '..', 'bin', 'manejador-procesos', 'mac', 'main');
            const whitelist = path.join(process.env.SRCDIR, '..', 'resources', 'whitelist-mac.txt');
            const blacklist = path.join(process.env.SRCDIR, '..', 'resources', 'blacklist-mac.txt');
            dir = `"${dir}" -verify -mac ${whitelist} ${blacklist}`;
            child_process_1.exec(dir, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }
    static startKilling() {
        this.kill();
        this.interval = setInterval(this.kill, this.respawnTime);
    }
    static stopKilling() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
exports.ProcessKiller = ProcessKiller;
ProcessKiller.respawnTime = 60 * 3 * 1000;
//# sourceMappingURL=ProcessKiller.js.map