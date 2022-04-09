import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailAssignmentsItemComponent } from './room-detail-assignments-item.component';

describe('RoomDetailAssignmentsItemComponent', () => {
  let component: RoomDetailAssignmentsItemComponent;
  let fixture: ComponentFixture<RoomDetailAssignmentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailAssignmentsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailAssignmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
