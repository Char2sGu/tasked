import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTasksItemComponent } from './room-detail-tasks-item.component';

describe('RoomDetailTasksItemComponent', () => {
  let component: RoomDetailTasksItemComponent;
  let fixture: ComponentFixture<RoomDetailTasksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTasksItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
