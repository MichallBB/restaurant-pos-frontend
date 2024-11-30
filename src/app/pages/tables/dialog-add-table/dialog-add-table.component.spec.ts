import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTableComponent } from './dialog-add-table.component';

describe('DialogAddTableComponent', () => {
  let component: DialogAddTableComponent;
  let fixture: ComponentFixture<DialogAddTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
