import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTasksItemAssignPopupComponent } from './room-detail-tasks-item-assign-popup.component';

describe('RoomDetailTasksItemAssignPopupComponent', () => {
  let component: RoomDetailTasksItemAssignPopupComponent;
  let fixture: ComponentFixture<RoomDetailTasksItemAssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTasksItemAssignPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTasksItemAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
