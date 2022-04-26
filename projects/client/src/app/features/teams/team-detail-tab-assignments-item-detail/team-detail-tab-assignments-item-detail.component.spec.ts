import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabAssignmentsItemDetailComponent } from './team-detail-tab-assignments-item-detail.component';

describe('TeamDetailTabAssignmentsItemDetailComponent', () => {
  let component: TeamDetailTabAssignmentsItemDetailComponent;
  let fixture: ComponentFixture<TeamDetailTabAssignmentsItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabAssignmentsItemDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TeamDetailTabAssignmentsItemDetailComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
