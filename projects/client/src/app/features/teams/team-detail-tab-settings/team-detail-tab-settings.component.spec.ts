import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabSettingsComponent } from './team-detail-tab-settings.component';

describe('TeamDetailTabSettingsComponent', () => {
  let component: TeamDetailTabSettingsComponent;
  let fixture: ComponentFixture<TeamDetailTabSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
