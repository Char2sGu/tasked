import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { skipNullable } from '../../../common/rxjs';
import { AuthService } from '../../../core/auth.service';
import { TeamsActivatedMapStorage } from '../teams-activated-map.storage';
import { TeamDetailState } from './team-detail-state.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  providers: [TeamDetailState],
  animations: [],
})
export class TeamDetailComponent implements OnInit {
  team$ = this.state.team$;

  constructor(
    private state: TeamDetailState,
    private activatedTeamsMap: TeamsActivatedMapStorage,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.state.team$,
      this.auth.user$.pipe(skipNullable()),
    ]).subscribe(([team, user]) => {
      const map = this.activatedTeamsMap;
      map.value[user.id] = team.id;
      map.save();
    });
  }
}
