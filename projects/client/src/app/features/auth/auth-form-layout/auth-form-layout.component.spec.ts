import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormLayoutComponent } from './auth-form-layout.component';

describe('AuthFormComponent', () => {
  let component: AuthFormLayoutComponent;
  let fixture: ComponentFixture<AuthFormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
