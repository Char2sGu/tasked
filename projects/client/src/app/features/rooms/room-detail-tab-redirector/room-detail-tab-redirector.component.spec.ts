import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailTabRedirectorComponent } from './room-detail-tab-redirector.component';

describe('RoomDetailTabRedirectorComponent', () => {
  let component: RoomDetailTabRedirectorComponent;
  let fixture: ComponentFixture<RoomDetailTabRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDetailTabRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailTabRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
