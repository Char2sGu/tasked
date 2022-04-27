import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSidebarComponent } from './team-detail-tabs-sidebar.component';

describe('TeamDetailSidebarComponent', () => {
  let component: TeamDetailSidebarComponent;
  let fixture: ComponentFixture<TeamDetailSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
