import { Component, Input, OnInit, TrackByFunction } from '@angular/core';

import { AuthService } from '../../../core/auth.service';
import {
  MembershipRequest,
  MembershipRequestState,
} from '../shared/membership-request-state.service';

@Component({
  selector: 'app-membership-request-list',
  templateUrl: './membership-request-list.component.html',
  styleUrls: ['./membership-request-list.component.scss'],
})
export class MembershipRequestListComponent implements OnInit {
  @Input() scrollableContainer?: HTMLElement;
  itemTracker: TrackByFunction<MembershipRequest> = (_, item) => item.id;

  constructor(public auth: AuthService, public state: MembershipRequestState) {}

  ngOnInit(): void {}
}
