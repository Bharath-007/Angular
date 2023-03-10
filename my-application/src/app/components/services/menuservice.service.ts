import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// dependency injection to inject the service available as root
//making use of service as well as dependency injection
export class MenuserviceService {
  menus = [
    {
      "name": "Dosa",
      "price": 50
    },
    {
      "name": "Idli",
      "price": 30
    },
    {
      "name": "Vada",
      "price": 40
    },
    {
      "name": "Sambhar Rice",
      "price": 80
    },
    {
      "name": "Curd Rice",
      "price": 60
    },
    {
      "name": "Biryani",
      "price": 120
    }
  ]
  constructor() { }
  get(){
    return this.menus;
  }
}
