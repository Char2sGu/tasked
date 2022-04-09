import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinityScrollTriggerComponent } from './infinity-scroll-trigger.component';

describe('FetchMoreTriggerComponent', () => {
  let component: InfinityScrollTriggerComponent;
  let fixture: ComponentFixture<InfinityScrollTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfinityScrollTriggerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinityScrollTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
