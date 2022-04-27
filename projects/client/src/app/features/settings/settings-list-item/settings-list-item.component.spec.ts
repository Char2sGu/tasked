import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListItemComponent } from './settings-list-item.component';

describe('SettingsListItemComponent', () => {
  let component: SettingsListItemComponent;
  let fixture: ComponentFixture<SettingsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
