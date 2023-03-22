import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private auth: AuthService,
    private snackbar: SnackBarService,
    private router: Router
  ) {}
  toggle = 'Show Users';
  isUsers = false;
  toggleUsers() {
    this.toggle === 'Show Users'
      ? (this.toggle = 'Hide Users')
      : (this.toggle = 'Show Users');
    this.isUsers = !this.isUsers;
  }

  logout() {
    this.snackbar.Blob('Logged Out', 'OK');
    this.auth.SignOutUser();
    this.router.navigate(['']);
  }
}
