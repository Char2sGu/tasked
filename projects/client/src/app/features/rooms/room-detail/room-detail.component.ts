import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';

import { ThemeService } from '../../../core/theme.service';
import { Role, RoomDetailGQL, RoomDetailQuery } from '../../../graphql';
import { AuthService } from '../../auth/auth.service';
import { RoomsActivatedMapStorage } from '../rooms-activated-map.storage';

type Room = RoomDetailQuery['room'];

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  room$!: Observable<Room>;

  links: TabLink[] = [];

  constructor(
    public theme: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private media: MediaObserver,
    private activatedRoomsMap: RoomsActivatedMapStorage,
    private auth: AuthService,
    private roomDetailGql: RoomDetailGQL,
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

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.auth.user$.pipe(first()).subscribe((user) => {
        const map = this.activatedRoomsMap;
        map.value[user!.id] = id;
        map.save();
      });

      this.room$ = this.roomDetailGql.watch({ id }).valueChanges.pipe(
        map(({ data }) => data.room),
        tap((room) => {
          if (!room.membership) throw new Error('Inaccessible room');
          this.links = [
            room.membership.role == Role.Member
              ? [$localize`Assignments`, ['assignments']]
              : [$localize`Tasks`, ['tasks']],
            [$localize`Settings`, ['settings']],
          ];
        }),
        catchError(() => {
          this.router.navigate(['/app/rooms']);
          return of<Room>();
        }),
      );
    });
  }
}

type TabLink = [title: string, commands: string[]];
