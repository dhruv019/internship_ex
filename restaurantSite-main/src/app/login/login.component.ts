import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginVal!: FormGroup;
  islogin = true;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authservice: AuthService) { }
  ngOnInit(): void {

    this.loginVal = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  onLogin() {
    this.http.get<any>("http://localhost:3000/users").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginVal.value.email && a.password == this.loginVal.value.password
      });
      if (user) {
        alert("login successfull")
        this.authservice.isUserLogedin = this.islogin;
        this.loginVal.reset();
        this.router.navigate(['restaurant'])
      } else {
        alert("user not found!")
      }
    },
      err => {
        alert("somthing went wrong!")
      })
  }
  get emailValidator() {
    return this.loginVal.get('email')
  }

  get passValidator() {
    return this.loginVal.get('password')
  }
}
