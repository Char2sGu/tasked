import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabAssignmentsItemComponent } from './team-detail-tab-assignments-item.component';

describe('TeamDetailTabAssignmentsItemComponent', () => {
  let component: TeamDetailTabAssignmentsItemComponent;
  let fixture: ComponentFixture<TeamDetailTabAssignmentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabAssignmentsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabAssignmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
