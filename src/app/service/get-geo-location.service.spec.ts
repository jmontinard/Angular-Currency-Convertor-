import { TestBed } from '@angular/core/testing';

import { IpAdressCallService } from './get-geo-location.service';

describe('IpAdressCallService', () => {
  let service: IpAdressCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpAdressCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
