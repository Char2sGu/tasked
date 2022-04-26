import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTasksItemAssignPopupComponent } from './team-detail-tasks-item-assign-popup.component';

describe('TeamDetailTasksItemAssignPopupComponent', () => {
  let component: TeamDetailTasksItemAssignPopupComponent;
  let fixture: ComponentFixture<TeamDetailTasksItemAssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTasksItemAssignPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTasksItemAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
