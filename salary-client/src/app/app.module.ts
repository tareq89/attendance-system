import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { SalarySheetComponent } from './salary-sheet/salary-sheet.component';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SalarySheetComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
