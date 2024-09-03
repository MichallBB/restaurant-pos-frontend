import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDishCategoriesComponent } from './dialog-edit-dish-categories.component';

describe('DialogEditDishCategoriesComponent', () => {
  let component: DialogEditDishCategoriesComponent;
  let fixture: ComponentFixture<DialogEditDishCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditDishCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditDishCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
