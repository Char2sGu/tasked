import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../room-detail-tasks/room-detail-tasks.component';

@Component({
  selector: 'app-room-detail-tasks-item-edit-popup',
  templateUrl: './room-detail-tasks-item-edit-popup.component.html',
  styleUrls: ['./room-detail-tasks-item-edit-popup.component.scss'],
})
export class RoomDetailTasksItemEditPopupComponent implements OnInit {
  @Input() task?: Task;
  data = { title: '', description: '' };

  constructor() {}

  ngOnInit(): void {}
}
