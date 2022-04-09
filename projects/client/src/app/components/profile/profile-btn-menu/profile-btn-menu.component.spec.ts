import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBtnMenuComponent } from './profile-btn-menu.component';

describe('ProfileBtnMenuComponent', () => {
  let component: ProfileBtnMenuComponent;
  let fixture: ComponentFixture<ProfileBtnMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileBtnMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBtnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
