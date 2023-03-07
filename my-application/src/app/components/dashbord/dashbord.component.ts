import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FoodDetails } from '../model/food-details';
import { OrderDetails } from '../model/order-details';
import { MenuserviceService } from '../services/menuservice.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  @Output() menuItems = new EventEmitter<object>();

  constructor(private menu: MenuserviceService) { }
  //using services to get the menus 
  menus = this.menu.get()

  orders: OrderDetails[] = [];

  get() {
    return this.menuItems.emit(this.menus)
  }
  getOrderData(orders: OrderDetails[]) {
    this.orders = orders;
  }
}
