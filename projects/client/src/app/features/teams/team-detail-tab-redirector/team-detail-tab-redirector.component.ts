import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Role, RoomDetailGQL } from '../../../graphql';

@Component({
  selector: 'app-team-detail-tab-redirector',
  templateUrl: './team-detail-tab-redirector.component.html',
  styleUrls: ['./team-detail-tab-redirector.component.scss'],
})
export class TeamDetailTabRedirectorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamGql: RoomDetailGQL,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.teamGql.fetch({ id }).subscribe((result) => {
      this.router.navigate(
        [
          '/app/teams',
          id,
          result.data.room.membership!.role == Role.Member
            ? 'assignments'
            : 'tasks',
        ],
        { replaceUrl: true },
      );
    });
  }
}
