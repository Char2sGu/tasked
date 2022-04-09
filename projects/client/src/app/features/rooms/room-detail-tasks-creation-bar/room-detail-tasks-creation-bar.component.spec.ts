import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTasksCreationBarComponent } from './room-detail-tasks-creation-bar.component';

describe('RoomDetailTasksCreationBarComponent', () => {
  let component: RoomDetailTasksCreationBarComponent;
  let fixture: ComponentFixture<RoomDetailTasksCreationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTasksCreationBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTasksCreationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
