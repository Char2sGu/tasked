import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSettingsComponent } from './team-detail-settings.component';

describe('TeamDetailSettingsComponent', () => {
  let component: TeamDetailSettingsComponent;
  let fixture: ComponentFixture<TeamDetailSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
