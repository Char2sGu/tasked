import { Component, OnInit, TemplateRef } from '@angular/core';
import { combineLatest } from 'rxjs';

import { skipFalsy } from '../../../common/rxjs';
import { AuthService } from '../../auth/auth.service';
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

  // use templates directly instead of template portals because portals will
  // destroy the view on destroy, which will break the animation.
  header?: TemplateRef<never>;

  constructor(
    private state: TeamDetailState,
    private activatedTeamsMap: TeamsActivatedMapStorage,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.state.team$,
      this.auth.user$.pipe(skipFalsy()),
    ]).subscribe(([team, user]) => {
      const map = this.activatedTeamsMap;
      map.value[user.id] = team.id;
      map.save();
    });
  }
}
