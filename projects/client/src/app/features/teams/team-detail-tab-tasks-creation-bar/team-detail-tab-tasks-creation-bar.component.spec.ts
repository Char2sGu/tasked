import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTaskCreationBarComponent } from './team-detail-tab-tasks-creation-bar.component';

describe('TeamDetailTaskCreationBarComponent', () => {
  let component: TeamDetailTaskCreationBarComponent;
  let fixture: ComponentFixture<TeamDetailTaskCreationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailTaskCreationBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTaskCreationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
