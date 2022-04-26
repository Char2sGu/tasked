import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTasksComponent } from './team-detail-tasks.component';

describe('TeamDetailTasksComponent', () => {
  let component: TeamDetailTasksComponent;
  let fixture: ComponentFixture<TeamDetailTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
