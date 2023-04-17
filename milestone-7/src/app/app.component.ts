import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Advanced Angular';

  constructor(private router: Router) {}

  viewUsers() {
    this.router.navigate(['/users']);
  }

  viewProducts() {
    this.router.navigate(['/products']);
  }
}
