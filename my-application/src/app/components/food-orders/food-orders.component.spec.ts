import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOrdersComponent } from './food-orders.component';

describe('FoodOrdersComponent', () => {
  let component: FoodOrdersComponent;
  let fixture: ComponentFixture<FoodOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
