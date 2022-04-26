import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabSettingsActionsComponent } from './team-detail-tab-settings-actions.component';

describe('TeamDetailTabSettingsActionsComponent', () => {
  let component: TeamDetailTabSettingsActionsComponent;
  let fixture: ComponentFixture<TeamDetailTabSettingsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabSettingsActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabSettingsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
