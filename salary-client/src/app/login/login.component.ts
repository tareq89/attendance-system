import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user = {
    email: null,
    password: null
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {    
  }

  onSubmit() {
    
    this.http.post('http://127.0.0.1:3000/login', this.user)
      .subscribe((result => {
        console.log(result)
        window.localStorage.setItem("userInfo", JSON.stringify(result));
        window.location.reload();
      }))
  }

}
