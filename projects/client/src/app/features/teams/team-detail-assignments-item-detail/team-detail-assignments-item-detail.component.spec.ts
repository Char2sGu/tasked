import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailAssignmentsItemDetailComponent } from './team-detail-assignments-item-detail.component';

describe('TeamDetailAssignmentsItemDetailComponent', () => {
  let component: TeamDetailAssignmentsItemDetailComponent;
  let fixture: ComponentFixture<TeamDetailAssignmentsItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailAssignmentsItemDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailAssignmentsItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
