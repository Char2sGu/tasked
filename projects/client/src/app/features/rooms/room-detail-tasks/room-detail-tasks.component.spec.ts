import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTasksComponent } from './room-detail-tasks.component';

describe('RoomDetailTasksComponent', () => {
  let component: RoomDetailTasksComponent;
  let fixture: ComponentFixture<RoomDetailTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
