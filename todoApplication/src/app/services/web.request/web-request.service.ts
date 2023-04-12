import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  root_url: string;
  constructor(private http: HttpClient) {
    this.root_url = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.root_url}/${uri}`);
  }

  post(uri: string, payload: Object) {
    // console.log(payload);
    return this.http.post(`${this.root_url}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.root_url}/${uri}`, payload);
  }

  delete(uri: string) {
    // console.log(`${this.root_url}/${uri}`);
    return this.http.delete(`${this.root_url}/${uri}`);
  }
}
