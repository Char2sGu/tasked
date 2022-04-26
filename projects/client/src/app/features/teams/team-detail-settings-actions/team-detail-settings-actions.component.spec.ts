import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSettingsActionsComponent } from './team-detail-settings-actions.component';

describe('TeamDetailSettingsActionsComponent', () => {
  let component: TeamDetailSettingsActionsComponent;
  let fixture: ComponentFixture<TeamDetailSettingsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSettingsActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSettingsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
