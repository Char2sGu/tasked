import { TestBed } from '@angular/core/testing';

import { TeamDetailState } from '../team-detail/team-detail-state.service';

describe('TeamsDetailState', () => {
  let service: TeamDetailState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetailState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
