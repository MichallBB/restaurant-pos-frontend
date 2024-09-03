import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDishComponent } from './dialog-add-dish.component';

describe('DialogAddDishComponent', () => {
  let component: DialogAddDishComponent;
  let fixture: ComponentFixture<DialogAddDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
