import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTaskCreationBarComponent } from './room-detail-task-creation-bar.component';

describe('RoomDetailTaskCreationBarComponent', () => {
  let component: RoomDetailTaskCreationBarComponent;
  let fixture: ComponentFixture<RoomDetailTaskCreationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTaskCreationBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTaskCreationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
