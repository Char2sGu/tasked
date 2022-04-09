import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSettingsSectionComponent } from './room-detail-settings-section.component';

describe('RoomDetailSettingsSectionComponent', () => {
  let component: RoomDetailSettingsSectionComponent;
  let fixture: ComponentFixture<RoomDetailSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSettingsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
