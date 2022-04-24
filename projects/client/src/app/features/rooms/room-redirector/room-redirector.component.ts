import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { skipFalsy } from '../../../common/rxjs';
import { RoomListGQL } from '../../../graphql';
import { AuthService } from '../../auth/auth.service';
import { RoomsActivatedMapStorage } from '../rooms-activated-map.storage';

@Component({
  selector: 'app-room-redirector',
  templateUrl: './room-redirector.component.html',
  styleUrls: ['./room-redirector.component.scss'],
})
export class RoomRedirectorComponent {
  constructor(
    private router: Router,
    private activatedRoomsMap: RoomsActivatedMapStorage,
    private auth: AuthService,
    private listGql: RoomListGQL,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.listGql.fetch().pipe(map((result) => result.data.rooms.results)),
      this.auth.user$.pipe(first(), skipFalsy()),
    ]).subscribe(([rooms, user]) => {
      const map = this.activatedRoomsMap;
      if (user.id in map.value) {
        const exists = rooms.some((item) => item.id == map.value[user.id]);
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
    const commands = ['/app/rooms'];
    if (id) commands.push(id);
    this.router.navigate(commands, { replaceUrl: true });
  }
}
