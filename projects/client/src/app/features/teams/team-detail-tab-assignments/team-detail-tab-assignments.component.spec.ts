import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabAssignmentsComponent } from './team-detail-tab-assignments.component';

describe('TeamDetailTabAssignmentsComponent', () => {
  let component: TeamDetailTabAssignmentsComponent;
  let fixture: ComponentFixture<TeamDetailTabAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabAssignmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
