import { TestBed } from '@angular/core/testing';

import { Notifier } from './notifier.service';

describe('Notifier', () => {
  let service: Notifier;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notifier);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
