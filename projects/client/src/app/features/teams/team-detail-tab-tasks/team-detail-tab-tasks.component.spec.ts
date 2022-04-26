import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTabTasksComponent } from './team-detail-tab-tasks.component';

describe('TeamDetailTabTasksComponent', () => {
  let component: TeamDetailTabTasksComponent;
  let fixture: ComponentFixture<TeamDetailTabTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTabTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTabTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
