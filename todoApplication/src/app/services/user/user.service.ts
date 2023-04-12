import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Login } from 'src/app/interface/login';
import { Register } from 'src/app/interface/register';
import { WebRequestService } from '../web.request/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //to get the current users id
  userId!: string;

  constructor(private webRequest: WebRequestService) {}

  createUser(registerUser: Register) {
    return this.webRequest
      .post('register', registerUser)
      .pipe(retry(1), catchError(this.handleError));
  }

  loginUser(userDetails: Login) {
    return this.webRequest
      .post('login', userDetails)
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
}
