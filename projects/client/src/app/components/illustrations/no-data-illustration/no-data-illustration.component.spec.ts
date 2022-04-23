import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataIllustrationComponent } from './no-data-illustration.component';

describe('NoDataIllustrationComponent', () => {
  let component: NoDataIllustrationComponent;
  let fixture: ComponentFixture<NoDataIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoDataIllustrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
