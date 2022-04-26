import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { MembershipAssignmentListQuery } from '../../../graphql';

type Assignment =
  MembershipAssignmentListQuery['membership']['assignments']['results'][number];

@Component({
  selector: 'app-team-detail-tab-assignments-item-detail',
  templateUrl: './team-detail-tab-assignments-item-detail.component.html',
  styleUrls: ['./team-detail-tab-assignments-item-detail.component.scss'],
  viewProviders: [DatePipe],
})
export class TeamDetailTabAssignmentsItemDetailComponent implements OnInit {
  @Input() assignment?: Assignment;

  infoItems: Info[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    const user = this.assignment?.task?.creator?.owner;
    this.infoItems = [
      {
        name: $localize`Creator`,
        value: user ? user.nickname ?? user.username : '',
        icon: 'person',
      },
      {
        name: $localize`Creation Time`,
        value: this.assignment
          ? this.datePipe.transform(this.assignment.createdAt, 'medium')!
          : '',
        icon: 'calendar_today',
      },
    ];
  }
}

interface Info {
  name: string;
  value: string;
  icon: string;
}
