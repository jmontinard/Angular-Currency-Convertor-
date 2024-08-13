import { TestBed } from '@angular/core/testing';

import { CurrencyCallService } from './currency-call.service';

describe('CurrencyCallService', () => {
  let service: CurrencyCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
