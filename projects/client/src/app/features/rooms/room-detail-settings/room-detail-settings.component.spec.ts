import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSettingsComponent } from './room-detail-settings.component';

describe('RoomDetailSettingsComponent', () => {
  let component: RoomDetailSettingsComponent;
  let fixture: ComponentFixture<RoomDetailSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
