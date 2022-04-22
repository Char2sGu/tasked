import { TestBed } from '@angular/core/testing';

import { ApplicationState } from './application-state.service';

describe('ApplicationState', () => {
  let service: ApplicationState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
