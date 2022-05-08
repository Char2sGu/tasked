import { TestBed } from '@angular/core/testing';

import { MembershipRequestState } from './membership-request-state.service';

describe('MembershipRequestState', () => {
  let service: MembershipRequestState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipRequestState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
