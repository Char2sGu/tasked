import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-list-normal-item',
  templateUrl: './settings-list-normal-item.component.html',
  styleUrls: ['./settings-list-normal-item.component.scss'],
})
export class SettingsListNormalItemComponent implements OnInit {
  @Input() name?: string;
  @Input() icon?: string;

  constructor() {}

  ngOnInit(): void {}
}
