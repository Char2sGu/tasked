import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTasksItemComponent } from './team-detail-tasks-item.component';

describe('TeamDetailTasksItemComponent', () => {
  let component: TeamDetailTasksItemComponent;
  let fixture: ComponentFixture<TeamDetailTasksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTasksItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
