import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-list-button-item',
  templateUrl: './settings-list-button-item.component.html',
  styleUrls: ['./settings-list-button-item.component.scss'],
})
export class SettingsListButtonItemComponent implements OnInit {
  @Input() name?: string;
  @Input() icon?: string;

  constructor() {}

  ngOnInit(): void {}
}
