import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoomDetailGQL, RoomDetailQuery } from '../../../graphql';

type Room = RoomDetailQuery['room'];

@Component({
  selector: 'app-room-detail-sidebar',
  templateUrl: './room-detail-sidebar.component.html',
  styleUrls: ['./room-detail-sidebar.component.scss'],
})
export class RoomDetailSidebarComponent implements OnInit {
  room$!: Observable<Room>;

  constructor(private route: ActivatedRoute, private roomGql: RoomDetailGQL) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.room$ = this.roomGql
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.room));
    });
  }
}
