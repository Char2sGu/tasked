import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabTasksItemEditPopupComponent } from './team-detail-tab-tasks-item-edit-popup.component';

describe('TeamDetailTabTasksItemEditPopupComponent', () => {
  let component: TeamDetailTabTasksItemEditPopupComponent;
  let fixture: ComponentFixture<TeamDetailTabTasksItemEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabTasksItemEditPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabTasksItemEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
