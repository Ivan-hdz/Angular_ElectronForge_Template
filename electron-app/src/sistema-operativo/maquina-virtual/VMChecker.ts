import {environments} from '../../environments';

const path = require('path');
import {execFile, exec} from 'child_process';
import {VMCheckResult} from './VMCheckResult';


export class VMChecker {
    public static runingInVM(): Promise<boolean> {
        if (process.env.FOR_DEV) {
            return new Promise<boolean>(resolve => resolve(false));
        } else if (process.platform === 'win32') {
            return new Promise<boolean>((resolve, reject) => {
                execFile( 'main.exe' , ['-host', '-win'],
                    {
                        cwd: path.join(environments.rootDir, '..', 'bin', 'manejador-procesos', 'win'),
                        encoding: 'utf-8',
                    },
                    (err, stdout, stderr) => {
                        if (err) {
                            console.error( err);
                            resolve(true);
                        } else if (stdout) {
                            const result = JSON.parse(stdout) as VMCheckResult;
                            if (result.isVM !== undefined) {
                                resolve(result.isVM);
                            } else {
                                // Si no puedo determinar si es o no una maquina virtual, regreso que es maquina virtual
                                console.warn('Prueba no concluyente', result);
                                resolve(true);
                            }

                        }
                    }
                );  });
        } else if (process.platform === 'darwin') {
            let dir = path.join(process.env.SRCDIR, '..',  'bin', 'manejador-procesos', 'mac', 'main');
            dir = `"${dir}" -host -mac`;
            return new Promise<boolean>((resolve, reject) => {
                exec(dir, (err, stdout, stderr) => {
                        if (err) {
                            // Si hay un error al intentar ejecutar el programa, regreso que es maquina virtual
                            console.error( err);
                            resolve(true);
                        } else if (stdout) {
                            const result = JSON.parse(stdout) as VMCheckResult;
                            if (result.isVM !== undefined) {
                                resolve(result.isVM);
                            } else {
                                // Si no puedo determinar si es o no una maquina virtual, regreso que es maquina virtual
                                console.warn('Prueba no concluyente', result);
                                resolve(true);
                            }
                        }
                    }
                );
            });
        } else {
            // Se esta corriendo en una plataforma diferente a mac o windows
            return new Promise<boolean>(resolve => resolve(true));
        }



    }
}

module.exports = {VMChecker};
