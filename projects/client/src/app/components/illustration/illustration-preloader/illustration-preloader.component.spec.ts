import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationPreloaderComponent } from './illustration-preloader.component';

describe('IllustrationPreloaderComponent', () => {
  let component: IllustrationPreloaderComponent;
  let fixture: ComponentFixture<IllustrationPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IllustrationPreloaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
