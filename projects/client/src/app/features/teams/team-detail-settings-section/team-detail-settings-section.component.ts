import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-detail-settings-section',
  templateUrl: './team-detail-settings-section.component.html',
  styleUrls: ['./team-detail-settings-section.component.scss'],
})
export class TeamDetailSettingsSectionComponent implements OnInit {
  @HostBinding('class') class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
