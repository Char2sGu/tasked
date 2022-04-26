import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSidebarMembershipListComponent } from './team-detail-sidebar-membership-list.component';

describe('TeamDetailSidebarMembershipListComponent', () => {
  let component: TeamDetailSidebarMembershipListComponent;
  let fixture: ComponentFixture<TeamDetailSidebarMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSidebarMembershipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailSidebarMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
