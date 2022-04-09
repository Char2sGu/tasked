import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormSignupComponent } from './auth-form-signup.component';

describe('AuthFormSignupComponent', () => {
  let component: AuthFormSignupComponent;
  let fixture: ComponentFixture<AuthFormSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormSignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
