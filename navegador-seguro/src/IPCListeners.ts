import {ipcMain} from 'electron';
import {VMChecker} from './sistema-operativo/maquina-virtual/VMChecker';

export class IPCListeners {
  public subscribe(): void {
    ipcMain.once('ping', (event, args) => {
      console.log(args);
      event.returnValue = 'pong';
    });
    // VMChecker
    ipcMain.once('vmchecker', async (event, args) => {
      event.returnValue = await VMChecker.runingInVM();
    });
    ipcMain.once('vmchecker-async', async (event, args) => {
      VMChecker.runingInVM().then((result) => event.reply('vmchecker-async-result', result));
    });
  }
}

