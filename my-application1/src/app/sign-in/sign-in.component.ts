import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../interface/login';
import { Register } from '../interface/register';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginDetails!: Login;
  userDetails: Register[] = [];
  loggedStatus: boolean = false;
  statusGreetings!: string;

  constructor(private userService: UserService, private router: Router) {}

  title = 'login';
  @ViewChild('loginForm')
  form!: NgForm;

  ngOnInit() {
    this.userDetails = this.userService.get();
  }

  validateUser(username: string, password: string) {
    return this.userDetails.find((user) => {
      if (
        (user.username === username || user.email === username) &&
        user.password === password
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  onLogin() {
    // Get the login details from the form
    this.loginDetails = this.form.value;
    const result = this.validateUser(
      this.loginDetails.username,
      this.loginDetails.password
    );
    if (result) {
      this.loggedStatus = true;
      this.statusGreetings = 'Logged successfully';
      this.router.navigate(['/home']);
    } else {
      this.loggedStatus = false;
      this.statusGreetings = 'No user found';
    }
  }
}
