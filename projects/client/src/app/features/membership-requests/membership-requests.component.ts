import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MembershipRequestState } from './shared/membership-request-state.service';

// TODO: beautify

@Component({
  selector: 'app-membership-requests',
  templateUrl: './membership-requests.component.html',
  styleUrls: ['./membership-requests.component.scss'],
  providers: [DatePipe, MembershipRequestState],
})
export class MembershipRequestsComponent implements OnInit {
  constructor(public state: MembershipRequestState) {}

  ngOnInit(): void {}
}
