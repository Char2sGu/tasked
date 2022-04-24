import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
})
export class RoomDetailComponent implements OnInit {
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  room$ = this.state.room$;

  links: TabLink[] = [];

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
          ? [$localize`Assignments`, ['assignments']]
          : [$localize`Tasks`, ['tasks']],
        [$localize`Settings`, ['settings']],
      ];
    });
  }
}

type TabLink = [title: string, commands: string[]];
