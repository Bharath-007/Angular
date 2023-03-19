import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  FIREBASE_ENDPOINT: string =
    'https://user-management-6ed11-default-rtdb.firebaseio.com/';
  endpoint: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }
}
