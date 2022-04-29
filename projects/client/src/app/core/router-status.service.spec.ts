import { TestBed } from '@angular/core/testing';

import { RouterStatus } from './router-status.service';

describe('RouterStatus', () => {
  let service: RouterStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
