import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  token = null;
  employees: Array<object> = [];
  constructor(private http: HttpClient) {

    this.token = JSON.parse(window.localStorage.getItem('userInfo')).token.toString();   
    console.log(this.token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': this.token
      })
    };
    this.http.get('http://127.0.0.1:3000/manager/attendance?skip=0&limit=30')
      .subscribe(result => {
        this.employees = result;
      })
   }

  ngOnInit() {
  }

}
