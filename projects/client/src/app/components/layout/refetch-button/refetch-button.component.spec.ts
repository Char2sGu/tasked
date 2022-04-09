import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefetchButtonComponent } from './refetch-button.component';

describe('RefetchButtonComponent', () => {
  let component: RefetchButtonComponent;
  let fixture: ComponentFixture<RefetchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefetchButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefetchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
