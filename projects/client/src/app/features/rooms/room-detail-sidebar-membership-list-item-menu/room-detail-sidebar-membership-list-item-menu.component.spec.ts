import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSidebarMembershipListItemMenuComponent } from './room-detail-sidebar-membership-list-item-menu.component';

describe('RoomDetailSidebarMembershipListItemMenuComponent', () => {
  let component: RoomDetailSidebarMembershipListItemMenuComponent;
  let fixture: ComponentFixture<RoomDetailSidebarMembershipListItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSidebarMembershipListItemMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      RoomDetailSidebarMembershipListItemMenuComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
