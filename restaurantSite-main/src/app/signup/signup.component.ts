import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup() {
    var info = this.http.post<any>("http://localhost:3000/users", this.signupForm.value).subscribe(_res => {
      alert("registration succesfully");
      this.signupForm.reset();
      console.log(info)
      this.router.navigate(['login'])
    },
      _err => {
        alert("somthing went wrong")
      })
  }

  get nameValidator() {
    return this.signupForm.get('name')
  }
  get numberValidator() {
    return this.signupForm.get('mobile')
  }
  get emailValidator() {
    return this.signupForm.get('email')
  }
  get passValidator() {
    return this.signupForm.get('password')
  }
}
