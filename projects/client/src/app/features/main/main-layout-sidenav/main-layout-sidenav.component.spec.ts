import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutSidenavComponent } from './main-layout-sidenav.component';

describe('MainLayoutSidenavComponent', () => {
  let component: MainLayoutSidenavComponent;
  let fixture: ComponentFixture<MainLayoutSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutSidenavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
