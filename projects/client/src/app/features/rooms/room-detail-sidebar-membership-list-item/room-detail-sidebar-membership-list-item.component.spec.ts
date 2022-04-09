import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSidebarMembershipListItemComponent } from './room-detail-sidebar-membership-list-item.component';

describe('RoomDetailSidebarMembershipListItemComponent', () => {
  let component: RoomDetailSidebarMembershipListItemComponent;
  let fixture: ComponentFixture<RoomDetailSidebarMembershipListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSidebarMembershipListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      RoomDetailSidebarMembershipListItemComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
