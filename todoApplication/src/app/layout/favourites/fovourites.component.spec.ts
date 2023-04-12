import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FovouritesComponent } from './fovourites.component';

describe('FovouritesComponent', () => {
  let component: FovouritesComponent;
  let fixture: ComponentFixture<FovouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FovouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FovouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
