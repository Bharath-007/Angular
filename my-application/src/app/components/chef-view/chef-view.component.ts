import { Component, EventEmitter, Input } from '@angular/core';
import { FoodDetails } from '../model/food-details';
import { OrderDetails } from '../model/order-details';

@Component({
  selector: 'app-chef-view',
  templateUrl: './chef-view.component.html',
  styleUrls: ['./chef-view.component.css']
})
export class ChefViewComponent {
  @Input() orders: OrderDetails[] = []

  style = {
    justifyContent: 'center',
    color: 'red'
  }

}
