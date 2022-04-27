import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditPasswordModalComponent } from './settings-edit-password-modal.component';

describe('SettingsEditPasswordModalComponent', () => {
  let component: SettingsEditPasswordModalComponent;
  let fixture: ComponentFixture<SettingsEditPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditPasswordModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
