import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabRedirectorComponent } from './team-detail-tab-redirector.component';

describe('TeamDetailTabRedirectorComponent', () => {
  let component: TeamDetailTabRedirectorComponent;
  let fixture: ComponentFixture<TeamDetailTabRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
