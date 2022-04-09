import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContentComponent } from './layout-content.component';

describe('LayoutContentComponent', () => {
  let component: LayoutContentComponent;
  let fixture: ComponentFixture<LayoutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
