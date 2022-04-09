import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms.component';

describe('MainLayoutSidenavRoomsComponent', () => {
  let component: MainLayoutSidenavRoomsComponent;
  let fixture: ComponentFixture<MainLayoutSidenavRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutSidenavRoomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutSidenavRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
