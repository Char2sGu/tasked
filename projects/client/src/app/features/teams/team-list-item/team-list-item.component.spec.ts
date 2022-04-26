import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListItemComponent } from './team-list-item.component';

describe('TeamListItemComponent', () => {
  let component: TeamListItemComponent;
  let fixture: ComponentFixture<TeamListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
