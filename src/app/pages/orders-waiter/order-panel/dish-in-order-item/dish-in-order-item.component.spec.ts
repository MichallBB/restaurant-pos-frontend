import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishInOrderItemComponent } from './dish-in-order-item.component';

describe('DishInOrderItemComponent', () => {
  let component: DishInOrderItemComponent;
  let fixture: ComponentFixture<DishInOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishInOrderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DishInOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
