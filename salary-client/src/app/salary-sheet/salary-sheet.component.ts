import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salary-sheet',
  templateUrl: './salary-sheet.component.html',
  styleUrls: ['./salary-sheet.component.css']
})
export class SalarySheetComponent implements OnInit {
  user = {};
  employees: Array<object> = [];
  constructor(private http: HttpClient) { 
    this.user = JSON.parse(window.localStorage.getItem('userInfo')).token;    
    this.http.get('http://127.0.0.1:3000')
      .subscribe(result => {
        this.employees = result;
      })
  }

  ngOnInit() {
  }

}
