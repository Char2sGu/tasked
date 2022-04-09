import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailAssignmentsComponent } from './room-detail-assignments.component';

describe('RoomDetailAssignmentsComponent', () => {
  let component: RoomDetailAssignmentsComponent;
  let fixture: ComponentFixture<RoomDetailAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailAssignmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
