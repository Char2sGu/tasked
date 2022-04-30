import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabsComponent } from './team-detail-tabs.component';

describe('TeamDetailTabsComponent', () => {
  let component: TeamDetailTabsComponent;
  let fixture: ComponentFixture<TeamDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
