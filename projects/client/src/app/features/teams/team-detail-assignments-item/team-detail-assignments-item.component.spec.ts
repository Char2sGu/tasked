import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailAssignmentsItemComponent } from './team-detail-assignments-item.component';

describe('TeamDetailAssignmentsItemComponent', () => {
  let component: TeamDetailAssignmentsItemComponent;
  let fixture: ComponentFixture<TeamDetailAssignmentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailAssignmentsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailAssignmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
