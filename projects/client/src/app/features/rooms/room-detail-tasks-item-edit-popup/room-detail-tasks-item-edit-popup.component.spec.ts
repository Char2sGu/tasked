import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTasksItemEditPopupComponent } from './room-detail-tasks-item-edit-popup.component';

describe('RoomDetailTasksItemEditPopupComponent', () => {
  let component: RoomDetailTasksItemEditPopupComponent;
  let fixture: ComponentFixture<RoomDetailTasksItemEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTasksItemEditPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTasksItemEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
