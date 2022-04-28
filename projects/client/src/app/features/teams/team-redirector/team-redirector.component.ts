import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { skipFalsy } from '../../../common/rxjs';
import { RoomListGQL } from '../../../graphql';
import { AuthService } from '../../../core/auth.service';
import { TeamsActivatedMapStorage } from '../teams-activated-map.storage';

@Component({
  selector: 'app-team-redirector',
  templateUrl: './team-redirector.component.html',
  styleUrls: ['./team-redirector.component.scss'],
})
export class TeamRedirectorComponent {
  constructor(
    private router: Router,
    private activatedTeamsMap: TeamsActivatedMapStorage,
    private auth: AuthService,
    private listGql: RoomListGQL,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.listGql.fetch().pipe(map((result) => result.data.rooms.results)),
      this.auth.user$.pipe(first(), skipFalsy()),
    ]).subscribe(([teams, user]) => {
      const map = this.activatedTeamsMap;
      if (user.id in map.value) {
        const exists = teams.some((item) => item.id == map.value[user.id]);
        if (exists) {
          this.redirect(map.value[user.id]);
        } else {
          delete map.value[user.id];
          map.save();
          this.redirect();
        }
      } else {
        this.redirect();
      }
    });
  }

  private redirect(id?: string) {
    const commands = ['/app/teams'];
    if (id) commands.push(id);
    this.router.navigate(commands, { replaceUrl: true });
  }
}
