import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularAndForge';
  start: number;
  end: number;
  constructor(private electronService: ElectronService) {
    this.start = (new Date()).getMilliseconds();
  }

  ngOnInit(): void {
    if(this.electronService.isElectronApp) {
      const pong: string = this.electronService.ipcRenderer.sendSync('ping', 'ping');
      console.log(pong);
      // VM Checker
      // // Sync
      // const isVm: boolean = this.electronService.ipcRenderer.sendSync('vmchecker');
      // console.log('isVm sync', isVm);
      // Async
      // this.electronService.ipcRenderer.send('vmchecker-async');
      // this.electronService.ipcRenderer.on('vmchecker-async-result', (event, args) => {
      //   console.log('isVm async', args);
      // });
      this.end = (new Date()).getMilliseconds();
      console.log('Diff', this.end - this.start);
    }
  }
}
