import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSidebarMembershipListComponent } from './room-detail-sidebar-membership-list.component';

describe('RoomDetailSidebarMembershipListComponent', () => {
  let component: RoomDetailSidebarMembershipListComponent;
  let fixture: ComponentFixture<RoomDetailSidebarMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSidebarMembershipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailSidebarMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
