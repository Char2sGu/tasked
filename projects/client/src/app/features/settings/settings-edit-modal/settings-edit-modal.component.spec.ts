import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditModalComponent } from './settings-edit-modal.component';

describe('SettingsEditModalComponent', () => {
  let component: SettingsEditModalComponent;
  let fixture: ComponentFixture<SettingsEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsEditModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
