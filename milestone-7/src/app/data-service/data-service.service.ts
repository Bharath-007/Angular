import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Root } from '../interface/Root';
import { Response } from '../interface/Products';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  usersEndpoint: string = 'https://jsonplaceholder.typicode.com/users';

  productsEndpoint: string = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  //Observable Http(CREATION)
  getUsers(): Observable<Root[]> {
    return this.http.get<Root[]>(this.usersEndpoint);
  }

  getProducts(): Observable<Response> {
    return this.http.get<Response>(this.productsEndpoint);
  }
}
