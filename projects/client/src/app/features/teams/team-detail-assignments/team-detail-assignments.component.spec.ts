import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailAssignmentsComponent } from './team-detail-assignments.component';

describe('TeamDetailAssignmentsComponent', () => {
  let component: TeamDetailAssignmentsComponent;
  let fixture: ComponentFixture<TeamDetailAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailAssignmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
