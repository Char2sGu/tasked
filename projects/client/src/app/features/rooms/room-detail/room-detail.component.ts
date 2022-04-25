import { transition, trigger } from '@angular/animations';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { RouterLinkActive } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SharedXAxisAnimation } from '../../../common/animations';
import { skipFalsy } from '../../../common/rxjs';
import { ThemeService } from '../../../core/theme.service';
import { Role } from '../../../graphql';
import { AuthService } from '../../auth/auth.service';
import { RoomsActivatedMapStorage } from '../rooms-activated-map.storage';
import { RoomDetailState } from './room-detail-state.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
  providers: [RoomDetailState],
  animations: [
    trigger('tab', [
      transition(':increment', SharedXAxisAnimation.apply('forward')),
      transition(':decrement', SharedXAxisAnimation.apply('backward')),
    ]),
  ],
})
export class RoomDetailComponent implements OnInit {
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  room$ = this.state.room$;

  links: TabLink[] = [];
  linkActiveIndex = 0;

  @ViewChildren(RouterLinkActive)
  set linkStates(value: QueryList<RouterLinkActive>) {
    this.subscribeLinkStates(value.toArray());
  }

  constructor(
    public theme: ThemeService,
    private state: RoomDetailState,
    private media: MediaObserver,
    private activatedRoomsMap: RoomsActivatedMapStorage,
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
      this.state.room$,
      this.auth.user$.pipe(skipFalsy()),
    ]).subscribe(([room, user]) => {
      const map = this.activatedRoomsMap;
      map.value[user.id] = room.id;
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
