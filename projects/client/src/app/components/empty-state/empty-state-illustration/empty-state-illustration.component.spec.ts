import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateIllustrationComponent } from './empty-state-illustration.component';

describe('EmptyStateIllustrationComponent', () => {
  let component: EmptyStateIllustrationComponent;
  let fixture: ComponentFixture<EmptyStateIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyStateIllustrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
