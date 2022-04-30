import { transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { RouterLinkActive } from '@angular/router';
import { EMPTY, map, mapTo, merge, Observable, startWith } from 'rxjs';

import { SharedAxisAnimation } from '../../../common/animations';
import { Breakpoint } from '../../../common/breakpoint.enum';
import { skipFalsy } from '../../../common/rxjs';
import { Role } from '../../../graphql/codegen';
import { TeamDetailState } from '../team-detail/team-detail-state.service';

@Component({
  selector: 'app-team-detail-tabs',
  templateUrl: './team-detail-tabs.component.html',
  styleUrls: ['./team-detail-tabs.component.scss'],
  animations: [
    trigger('tab', [
      transition(':increment', SharedAxisAnimation.apply('x', 'forward')),
      transition(':decrement', SharedAxisAnimation.apply('x', 'backward')),
    ]),
  ],
})
export class TeamDetailTabsComponent implements OnInit {
  team$ = this.state.team$;
  sidebarOpen$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;
  links$!: Observable<TabLink[]>;
  linkIndexActive$: Observable<number> = EMPTY;

  @ViewChildren(RouterLinkActive)
  set linkStates(linkStatesQueryList: QueryList<RouterLinkActive>) {
    if (!linkStatesQueryList.length) return;
    const linkStates = linkStatesQueryList.toArray();
    this.linkIndexActive$ = merge(
      ...linkStates.map((linkState, index) =>
        linkState.isActiveChange.pipe(
          startWith(linkState.isActive),
          skipFalsy(),
          mapTo(index),
        ),
      ),
    );
  }

  constructor(
    private state: TeamDetailState,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    const isDesktop$ = this.breakpointObserver
      .observe(Breakpoint.Middle)
      .pipe(map((state) => state.matches));
    this.sidebarOpen$ = isDesktop$;
    this.sidebarMode$ = isDesktop$.pipe(
      map((value) => (value ? 'side' : 'over')),
    );

    this.links$ = this.state.membership$.pipe(
      skipFalsy(),
      map((membership) => [
        membership.role == Role.Member
          ? { title: $localize`Assignments`, commands: ['assignments'] }
          : { title: $localize`Tasks`, commands: ['tasks'] },
        { title: $localize`Settings`, commands: ['settings'] },
      ]),
    );
  }
}

type TabLink = { title: string; commands: string[] };
