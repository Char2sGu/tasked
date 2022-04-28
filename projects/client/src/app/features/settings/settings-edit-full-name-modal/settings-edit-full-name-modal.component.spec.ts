import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditFullNameModalComponent } from './settings-edit-full-name-modal.component';

describe('SettingsEditFullNameModalComponent', () => {
  let component: SettingsEditFullNameModalComponent;
  let fixture: ComponentFixture<SettingsEditFullNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditFullNameModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditFullNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
