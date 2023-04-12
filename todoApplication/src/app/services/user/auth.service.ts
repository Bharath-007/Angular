import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from 'src/app/interface/register';
import { Task } from 'src/app/interface/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  User = new BehaviorSubject<any>(null);

  constructor() {}

  public get UserSubjectValue() {
    if (this.User) {
      return this.User.value;
    } else {
      return null;
    }
  }

  isLoggedIn(data: Object) {
    this.User.next(data);
  }

  isLoggedOut() {
    this.User.next(null);
  }
}
