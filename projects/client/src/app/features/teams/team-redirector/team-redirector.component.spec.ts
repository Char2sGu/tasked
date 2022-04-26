import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRedirectorComponent } from './team-redirector.component';

describe('TeamRedirectorComponent', () => {
  let component: TeamRedirectorComponent;
  let fixture: ComponentFixture<TeamRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
