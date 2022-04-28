import { Component, OnInit } from '@angular/core';

import { SettingsService } from './shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [SettingsService],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
