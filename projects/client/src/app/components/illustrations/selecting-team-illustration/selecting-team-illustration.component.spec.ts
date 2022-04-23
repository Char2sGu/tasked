import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingTeamIllustrationComponent } from './selecting-team-illustration.component';

describe('SelectingTeamIllustrationComponent', () => {
  let component: SelectingTeamIllustrationComponent;
  let fixture: ComponentFixture<SelectingTeamIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectingTeamIllustrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingTeamIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
