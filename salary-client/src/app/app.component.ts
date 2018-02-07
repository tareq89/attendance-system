import { Component } from '@angular/core';
import { LoginComponent }  from './login/login.component';
import { SalarySheetComponent } from './salary-sheet/salary-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = {};
  loggedIn = false;
  isManager = false;
  isHr = false;

  constructor() {
    this.user = JSON.parse(window.localStorage.getItem("userInfo")).user;
    console.log(this.user)
    if(!this.user) this.loggedIn = true;
    else this.loggedIn = true;

    this.isManager = this.user['role'].indexOf('manager') > 0 ? true : false;
    this.isHr = this.user['role'].indexOf('hr') > 0 ? true : false;
  }
}
