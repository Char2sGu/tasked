import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-list-item',
  templateUrl: './settings-list-item.component.html',
  styleUrls: ['./settings-list-item.component.scss'],
})
export class SettingsListItemComponent implements OnInit {
  @Input() editable = false;
  @Output() edit = new EventEmitter();
  @Input() icon?: string;
  @Input() name?: string;
  @Input() value?: unknown;

  constructor() {}

  ngOnInit(): void {}
}
