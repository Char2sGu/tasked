import { transition, trigger } from '@angular/animations';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { RouterLinkActive } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SharedAxisAnimation } from '../../../common/animations';
import { skipFalsy } from '../../../common/rxjs';
import { ThemeService } from '../../../core/theme.service';
import { Role } from '../../../graphql';
import { AuthService } from '../../auth/auth.service';
import { TeamsActivatedMapStorage } from '../teams-activated-map.storage';
import { TeamDetailState } from './team-detail-state.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  providers: [TeamDetailState],
  animations: [
    trigger('tab', [
      transition(':increment', SharedAxisAnimation.apply('x', 'forward')),
      transition(':decrement', SharedAxisAnimation.apply('x', 'backward')),
    ]),
  ],
})
export class TeamDetailComponent implements OnInit {
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  team$ = this.state.team$;

  links: TabLink[] = [];
  linkActiveIndex = 0;

  @ViewChildren(RouterLinkActive)
  set linkStates(value: QueryList<RouterLinkActive>) {
    this.subscribeLinkStates(value.toArray());
  }

  constructor(
    public theme: ThemeService,
    private state: TeamDetailState,
    private media: MediaObserver,
    private activatedTeamsMap: TeamsActivatedMapStorage,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.sidebarOpened$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-sm' && item.matches),
        ),
      );

    this.sidebarMode$ = this.sidebarOpened$.pipe(
      map((value) => (value ? 'side' : 'over')),
    );

    combineLatest([
      this.state.team$,
      this.auth.user$.pipe(skipFalsy()),
    ]).subscribe(([team, user]) => {
      const map = this.activatedTeamsMap;
      map.value[user.id] = team.id;
      map.save();
    });

    this.state.membership$.pipe(skipFalsy()).subscribe((membership) => {
      this.links = [
        membership.role == Role.Member
          ? { title: $localize`Assignments`, commands: ['assignments'] }
          : { title: $localize`Tasks`, commands: ['tasks'] },
        { title: $localize`Settings`, commands: ['settings'] },
      ];
    });
  }

  private subscribeLinkStates(linkStates: RouterLinkActive[]) {
    for (const [index, state] of linkStates.entries()) {
      if (this.links[index].subscribed) return;
      this.links[index].subscribed = true;
      state.isActiveChange.subscribe((isActive) => {
        if (isActive) this.linkActiveIndex = index;
      });
    }
  }
}

type TabLink = { title: string; commands: string[]; subscribed?: boolean };
