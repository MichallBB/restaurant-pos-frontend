import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTableComponent } from './dialog-edit-table.component';

describe('DialogEditTableComponent', () => {
  let component: DialogEditTableComponent;
  let fixture: ComponentFixture<DialogEditTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
