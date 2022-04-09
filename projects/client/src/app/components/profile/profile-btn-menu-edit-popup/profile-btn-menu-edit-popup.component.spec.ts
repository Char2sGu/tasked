import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBtnMenuEditPopupComponent } from './profile-btn-menu-edit-popup.component';

describe('ProfileBtnMenuEditPopupComponent', () => {
  let component: ProfileBtnMenuEditPopupComponent;
  let fixture: ComponentFixture<ProfileBtnMenuEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileBtnMenuEditPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBtnMenuEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
