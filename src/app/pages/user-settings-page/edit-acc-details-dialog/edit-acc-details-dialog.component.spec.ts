import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccDetailsDialogComponent } from './edit-acc-details-dialog.component';

describe('EditAccDetailsDialogComponent', () => {
  let component: EditAccDetailsDialogComponent;
  let fixture: ComponentFixture<EditAccDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAccDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
