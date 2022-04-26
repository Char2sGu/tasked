import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSettingsSectionComponent } from './team-detail-settings-section.component';

describe('TeamDetailSettingsSectionComponent', () => {
  let component: TeamDetailSettingsSectionComponent;
  let fixture: ComponentFixture<TeamDetailSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSettingsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
