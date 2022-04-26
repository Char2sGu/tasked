import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailSidebarMembershipListItemComponent } from './team-detail-sidebar-membership-list-item.component';

describe('TeamDetailSidebarMembershipListItemComponent', () => {
  let component: TeamDetailSidebarMembershipListItemComponent;
  let fixture: ComponentFixture<TeamDetailSidebarMembershipListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailSidebarMembershipListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TeamDetailSidebarMembershipListItemComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
