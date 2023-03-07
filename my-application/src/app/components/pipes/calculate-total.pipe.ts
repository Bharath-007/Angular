import { Pipe, PipeTransform } from '@angular/core';
import { MenuserviceService } from '../services/menuservice.service';

@Pipe({
  name: 'calculateTotal'
})
export class CalculateTotalPipe implements PipeTransform {
  transform(value: number, quantity:string){
    return value*Number(quantity);
  }

}
