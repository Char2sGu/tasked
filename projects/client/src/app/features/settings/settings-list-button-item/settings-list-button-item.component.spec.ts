import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListButtonItemComponent } from './settings-list-button-item.component';

describe('SettingsListButtonItemComponent', () => {
  let component: SettingsListButtonItemComponent;
  let fixture: ComponentFixture<SettingsListButtonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsListButtonItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListButtonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
