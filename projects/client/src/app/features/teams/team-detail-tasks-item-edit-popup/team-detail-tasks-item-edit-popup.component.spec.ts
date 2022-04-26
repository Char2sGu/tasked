import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTasksItemEditPopupComponent } from './team-detail-tasks-item-edit-popup.component';

describe('TeamDetailTasksItemEditPopupComponent', () => {
  let component: TeamDetailTasksItemEditPopupComponent;
  let fixture: ComponentFixture<TeamDetailTasksItemEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTasksItemEditPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTasksItemEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
