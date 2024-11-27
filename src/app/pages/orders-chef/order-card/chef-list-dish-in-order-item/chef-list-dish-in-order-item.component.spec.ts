import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefListDishInOrderItemComponent } from './chef-list-dish-in-order-item.component';

describe('ChefListDishInOrderItemComponent', () => {
  let component: ChefListDishInOrderItemComponent;
  let fixture: ComponentFixture<ChefListDishInOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefListDishInOrderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChefListDishInOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
