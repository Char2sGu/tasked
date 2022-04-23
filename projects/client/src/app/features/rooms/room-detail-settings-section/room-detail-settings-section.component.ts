import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-detail-settings-section',
  templateUrl: './room-detail-settings-section.component.html',
  styleUrls: ['./room-detail-settings-section.component.scss'],
})
export class RoomDetailSettingsSectionComponent implements OnInit {
  @HostBinding('class') class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
