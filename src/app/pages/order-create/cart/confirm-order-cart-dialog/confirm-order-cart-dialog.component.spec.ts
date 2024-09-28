import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderCartDialogComponent } from './confirm-order-cart-dialog.component';

describe('ConfirmOrderCartDialogComponent', () => {
  let component: ConfirmOrderCartDialogComponent;
  let fixture: ComponentFixture<ConfirmOrderCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmOrderCartDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmOrderCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
