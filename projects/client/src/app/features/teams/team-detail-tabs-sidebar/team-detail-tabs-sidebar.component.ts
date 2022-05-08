import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamDetailGQL, TeamDetailQuery } from '../../../graphql/codegen';

type Team = TeamDetailQuery['team'];

@Component({
  selector: 'app-team-detail-tabs-sidebar',
  templateUrl: './team-detail-tabs-sidebar.component.html',
  styleUrls: ['./team-detail-tabs-sidebar.component.scss'],
})
export class TeamDetailSidebarComponent implements OnInit {
  team$!: Observable<Team>;

  constructor(private route: ActivatedRoute, private teamGql: TeamDetailGQL) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.team$ = this.teamGql
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.team));
    });
  }
}
