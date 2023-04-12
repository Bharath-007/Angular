import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interface/register';
import { Task } from 'src/app/interface/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user!: any;
  user_id!: string;

  @ViewChild('loginForm') form!: NgForm;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackbarService,
    private auth: AuthService
  ) {}

  onLogin() {
    let user = this.form.value;

    return this.userService.loginUser(user).subscribe(
      (user) => {
        this.user = user;
        this.auth.isLoggedIn(user);
        this.snackBar.toastMessage('Login successful','OK');
        this.router.navigate(['/todo/', this.user._id]);
      },
      (error) => {
        this.snackBar.toastMessage(error, 'OK');
        this.form.reset();
      }
    );
  }
}
