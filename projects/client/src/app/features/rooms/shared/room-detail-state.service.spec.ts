import { TestBed } from '@angular/core/testing';

import { RoomDetailState } from './room-detail-state.service';

describe('RoomsDetailState', () => {
  let service: RoomDetailState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDetailState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
