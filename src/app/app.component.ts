import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  connected: boolean;
  title = 'GNA';


  constructor () {
    this.connected = false;
    this.title = 'kappa';
    this.title = 'GNA';
  }

}
