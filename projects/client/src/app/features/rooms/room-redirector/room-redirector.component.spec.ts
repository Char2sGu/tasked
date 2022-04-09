import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRedirectorComponent } from './room-redirector.component';

describe('RoomRedirectorComponent', () => {
  let component: RoomRedirectorComponent;
  let fixture: ComponentFixture<RoomRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
