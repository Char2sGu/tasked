import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailSidebarComponent } from './room-detail-sidebar.component';

describe('RoomDetailSidebarComponent', () => {
  let component: RoomDetailSidebarComponent;
  let fixture: ComponentFixture<RoomDetailSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
