import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSettingsActionsComponent } from './room-detail-settings-actions.component';

describe('RoomDetailSettingsActionsComponent', () => {
  let component: RoomDetailSettingsActionsComponent;
  let fixture: ComponentFixture<RoomDetailSettingsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSettingsActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailSettingsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
