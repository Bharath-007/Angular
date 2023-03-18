import { Injectable } from '@angular/core';
import { Register } from '../interface/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: Register[] = [];

  constructor() {}

  addUser(user: Register) {
    this.userDetails.push(user);
    // console.log(`added user - ${}`);
  }
  get() {
    return this.userDetails;
  }
}
