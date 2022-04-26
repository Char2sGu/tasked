import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSidebarMembershipListItemMenuComponent } from './team-detail-sidebar-membership-list-item-menu.component';

describe('TeamDetailSidebarMembershipListItemMenuComponent', () => {
  let component: TeamDetailSidebarMembershipListItemMenuComponent;
  let fixture: ComponentFixture<TeamDetailSidebarMembershipListItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSidebarMembershipListItemMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TeamDetailSidebarMembershipListItemMenuComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
