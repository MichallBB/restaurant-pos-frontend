import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPinDialogComponent } from './edit-pin-dialog.component';

describe('EditPinDialogComponent', () => {
  let component: EditPinDialogComponent;
  let fixture: ComponentFixture<EditPinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPinDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
