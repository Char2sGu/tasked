import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditGenderModalComponent } from './settings-edit-gender-modal.component';

describe('SettingsEditGenderModalComponent', () => {
  let component: SettingsEditGenderModalComponent;
  let fixture: ComponentFixture<SettingsEditGenderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditGenderModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditGenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
