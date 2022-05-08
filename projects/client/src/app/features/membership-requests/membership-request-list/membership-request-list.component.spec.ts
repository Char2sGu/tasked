import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestListComponent } from './membership-request-list.component';

describe('MembershipRequestListComponent', () => {
  let component: MembershipRequestListComponent;
  let fixture: ComponentFixture<MembershipRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipRequestListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
