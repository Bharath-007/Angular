import { Component, Output, EventEmitter } from '@angular/core';
import { empty } from 'rxjs';
import { OrderDetails } from '../model/order-details';
import { MenuserviceService } from '../services/menuservice.service';

@Component({
  selector: 'app-food-orders',
  templateUrl: './food-orders.component.html',
  styleUrls: ['./food-orders.component.css']
})
export class FoodOrdersComponent {
  orders: OrderDetails[] = [];

  @Output() orderData = new EventEmitter<OrderDetails[]>();

  constructor(private menu: MenuserviceService) { }
  menus = this.menu.get();

  itemName: string = '';
  quantity!:number;
  quantity1!:string;
  err!: string;
  price!: number;

  onSelect(option: Event) {
    let value = (option.target as HTMLSelectElement).value
    this.itemName = value;
    console.log(this.itemName);
  }

  sendOrder(quantity: string) {
    this.quantity1 = quantity;
    this.quantity = Number(quantity);
    let order: OrderDetails = {
      name: this.itemName,
      quantity: this.quantity
    }
    console.log(this.quantity1);
    
    if (this.itemName == '' || this.quantity <= 0) {
      this.err = 'select some food then order';
    } else {
      this.err = '';
      this.orders.push(order);
      this.orderData.emit(this.orders);
    }
    console.log(this.orders);
  }

  getPrice(): number {
    let value = this.menus.find(item => item.name == this.itemName);
    console.log(value?.price);
    return value?.price ?? 0;
    
  }

  

}
