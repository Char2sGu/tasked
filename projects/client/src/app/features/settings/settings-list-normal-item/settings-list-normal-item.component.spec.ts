import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListNormalItemComponent } from './settings-list-normal-item.component';

describe('SettingsListNormalItemComponent', () => {
  let component: SettingsListNormalItemComponent;
  let fixture: ComponentFixture<SettingsListNormalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsListNormalItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListNormalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
