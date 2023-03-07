import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { FoodOrdersComponent } from './components/food-orders/food-orders.component';
import { ChefViewComponent } from './components/chef-view/chef-view.component';
import { CalculateTotalPipe } from './components/pipes/calculate-total.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    FoodOrdersComponent,
    ChefViewComponent,
    CalculateTotalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
