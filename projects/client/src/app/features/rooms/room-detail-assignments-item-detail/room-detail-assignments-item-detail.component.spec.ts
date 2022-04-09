import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailAssignmentsItemDetailComponent } from './room-detail-assignments-item-detail.component';

describe('RoomDetailAssignmentsItemDetailComponent', () => {
  let component: RoomDetailAssignmentsItemDetailComponent;
  let fixture: ComponentFixture<RoomDetailAssignmentsItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailAssignmentsItemDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailAssignmentsItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
