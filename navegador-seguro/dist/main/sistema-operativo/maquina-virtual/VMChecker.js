"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VMChecker = void 0;
const environments_1 = require("../../environments");
const path = require('path');
const child_process_1 = require("child_process");
class VMChecker {
    static runingInVM() {
        if (process.env.FOR_DEV) {
            return new Promise(resolve => resolve(false));
        }
        else if (process.platform === 'win32') {
            return new Promise((resolve, reject) => {
                child_process_1.execFile('main.exe', ['-host', '-win'], {
                    cwd: path.join(environments_1.environments.rootDir, '..', 'bin', 'manejador-procesos', 'win'),
                    encoding: 'utf-8',
                }, (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        resolve(true);
                    }
                    else if (stdout) {
                        const result = JSON.parse(stdout);
                        if (result.isVM !== undefined) {
                            resolve(result.isVM);
                        }
                        else {
                            // Si no puedo determinar si es o no una maquina virtual, regreso que es maquina virtual
                            console.warn('Prueba no concluyente', result);
                            resolve(true);
                        }
                    }
                });
            });
        }
        else if (process.platform === 'darwin') {
            let dir = path.join(process.env.SRCDIR, '..', 'bin', 'manejador-procesos', 'mac', 'main');
            dir = `"${dir}" -host -mac`;
            return new Promise((resolve, reject) => {
                child_process_1.exec(dir, (err, stdout, stderr) => {
                    if (err) {
                        // Si hay un error al intentar ejecutar el programa, regreso que es maquina virtual
                        console.error(err);
                        resolve(true);
                    }
                    else if (stdout) {
                        const result = JSON.parse(stdout);
                        if (result.isVM !== undefined) {
                            resolve(result.isVM);
                        }
                        else {
                            // Si no puedo determinar si es o no una maquina virtual, regreso que es maquina virtual
                            console.warn('Prueba no concluyente', result);
                            resolve(true);
                        }
                    }
                });
            });
        }
        else {
            // Se esta corriendo en una plataforma diferente a mac o windows
            return new Promise(resolve => resolve(true));
        }
    }
}
exports.VMChecker = VMChecker;
module.exports = { VMChecker };
//# sourceMappingURL=VMChecker.js.map