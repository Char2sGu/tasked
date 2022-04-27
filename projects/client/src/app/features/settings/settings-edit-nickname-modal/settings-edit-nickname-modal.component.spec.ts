import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditNicknameModalComponent } from './settings-edit-nickname-modal.component';

describe('SettingsEditNicknameModalComponent', () => {
  let component: SettingsEditNicknameModalComponent;
  let fixture: ComponentFixture<SettingsEditNicknameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditNicknameModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditNicknameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
