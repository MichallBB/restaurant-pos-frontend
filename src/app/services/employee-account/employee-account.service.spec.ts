import { TestBed } from '@angular/core/testing';

import { EmployeeAccountService } from './employee-account.service';

describe('EmployeeAccountService', () => {
  let service: EmployeeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
