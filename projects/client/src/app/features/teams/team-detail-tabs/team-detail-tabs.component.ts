import { transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { map, Observable } from 'rxjs';

import { SharedAxisAnimation } from '../../../common/animations';
import { Breakpoint } from '../../../common/breakpoint.enum';
import { skipNullable } from '../../../common/rxjs';
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
  linkIndexActive?: number;
  linkTracker: TrackByFunction<TabLink> = (_, item) => item.title;

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
      skipNullable(),
      map((membership) => [
        membership.role === Role.Member
          ? { title: $localize`Assignments`, commands: ['assignments'] }
          : { title: $localize`Tasks`, commands: ['tasks'] },
        { title: $localize`Settings`, commands: ['settings'] },
      ]),
    );
  }
}

interface TabLink {
  title: string;
  commands: string[];
}
