import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestListItemComponent } from './membership-request-list-item.component';

describe('MembershipRequestListItemComponent', () => {
  let component: MembershipRequestListItemComponent;
  let fixture: ComponentFixture<MembershipRequestListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipRequestListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipRequestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
