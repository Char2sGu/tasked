import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabTasksItemAssignPopupComponent } from './team-detail-tab-tasks-item-assign-popup.component';

describe('TeamDetailTabTasksItemAssignPopupComponent', () => {
  let component: TeamDetailTabTasksItemAssignPopupComponent;
  let fixture: ComponentFixture<TeamDetailTabTasksItemAssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabTasksItemAssignPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TeamDetailTabTasksItemAssignPopupComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
