import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/components/interface/register';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UserService } from 'src/app/service/user.service';
import { Login } from '../../interface/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedStatus: boolean = false;
  statusGreetings!: string;

  userDetails!: Register[];
  login!: Login;
  @ViewChild('loginForm') form!: NgForm;

  constructor(
    private router: Router,
    private snackbar: SnackBarService,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.userService.getUser();
  }

  validateUser(username: string, password: string) {
    return this.userDetails.find((user) => {
      user.name === username && user.password === password;
    });
  }

  triggerSnackbar(message: string) {
    this.snackbar.Blob(message, 'OK');
  }

  onLogin() {
    this.auth.User.subscribe((data) => {
      if (data) {
        this.loggedStatus = true;
      } else {
        this.loggedStatus = false;
      }
    });
    if (this.userDetails.length !== 0) {
      console.log(this.form.value);
      this.login = this.form.value;
      const result = this.validateUser(
        this.login.username,
        this.login.password
      );
      this.auth.SignInUser(this.login);
      // console.log(`res - ${typeof result}`);
      this.statusGreetings = 'Logged successfully';
      this.router.navigate(['/home']);
    } else {
      this.loggedStatus = false;
      this.statusGreetings = 'No user found';
    }
    this.triggerSnackbar(this.statusGreetings);
  }
}
