import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-detail-tab-settings-section',
  templateUrl: './team-detail-tab-settings-section.component.html',
  styleUrls: ['./team-detail-tab-settings-section.component.scss'],
})
export class TeamDetailTabSettingsSectionComponent implements OnInit {
  @HostBinding('class') class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
