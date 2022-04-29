import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, first } from 'rxjs';

import { Role } from '../../../graphql';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

@Component({
  selector: 'app-team-detail-tab-redirector',
  templateUrl: './team-detail-tab-redirector.component.html',
  styleUrls: ['./team-detail-tab-redirector.component.scss'],
})
export class TeamDetailTabRedirectorComponent implements OnInit {
  constructor(private state: TeamDetailState, private router: Router) {}

  ngOnInit(): void {
    combineLatest([this.state.team$, this.state.membership$])
      .pipe(first())
      .subscribe(([team, membership]) => {
        this.router.navigate(
          [
            '/',
            'app',
            'teams',
            team.id,
            membership.role == Role.Member ? 'assignments' : 'tasks',
          ],
          { replaceUrl: true },
        );
      });
  }
}
