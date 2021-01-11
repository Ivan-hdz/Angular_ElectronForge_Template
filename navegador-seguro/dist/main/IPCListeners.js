"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCListeners = void 0;
const electron_1 = require("electron");
const VMChecker_1 = require("./sistema-operativo/maquina-virtual/VMChecker");
class IPCListeners {
    subscribe() {
        electron_1.ipcMain.once('ping', (event, args) => {
            console.log(args);
            event.returnValue = 'pong';
        });
        // VMChecker
        electron_1.ipcMain.once('vmchecker', (event, args) => __awaiter(this, void 0, void 0, function* () {
            event.returnValue = yield VMChecker_1.VMChecker.runingInVM();
        }));
        electron_1.ipcMain.once('vmchecker-async', (event, args) => __awaiter(this, void 0, void 0, function* () {
            VMChecker_1.VMChecker.runingInVM().then((result) => event.reply('vmchecker-async-result', result));
        }));
    }
}
exports.IPCListeners = IPCListeners;
//# sourceMappingURL=IPCListeners.js.map