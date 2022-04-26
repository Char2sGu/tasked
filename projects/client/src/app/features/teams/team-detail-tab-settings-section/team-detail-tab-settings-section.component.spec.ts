import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabSettingsSectionComponent } from './team-detail-tab-settings-section.component';

describe('TeamDetailTabSettingsSectionComponent', () => {
  let component: TeamDetailTabSettingsSectionComponent;
  let fixture: ComponentFixture<TeamDetailTabSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabSettingsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
