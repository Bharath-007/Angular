import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../components/home/interface/user';
import { Register } from '../components/interface/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: Register[] = [];
  users!: Register[];
  endpoint: string = 'https://jsonplaceholder.typicode.com/users'; //initalizing an endpoint to get the already exsisting data
  constructor(private http: HttpClient) {} //injecting the hhtp service

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //client side
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //server side
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  registerUser(user: Register) {
    // console.log(`${user.name}`);
    this.userDetails.push(user);
  }
  getUser() {
    console.log(this.userDetails);
    return this.userDetails;
  }
}
