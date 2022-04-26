import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabTasksItemComponent } from './team-detail-tab-tasks-item.component';

describe('TeamDetailTabTasksItemComponent', () => {
  let component: TeamDetailTabTasksItemComponent;
  let fixture: ComponentFixture<TeamDetailTabTasksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabTasksItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabTasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
