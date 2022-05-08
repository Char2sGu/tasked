import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestsComponent } from './membership-requests.component';

describe('MembershipRequestsComponent', () => {
  let component: MembershipRequestsComponent;
  let fixture: ComponentFixture<MembershipRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipRequestsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
