import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-edit-modal',
  templateUrl: './settings-edit-modal.component.html',
  styleUrls: ['./settings-edit-modal.component.scss'],
})
export class SettingsEditModalComponent implements OnInit {
  @Input() headline?: string;
  @Input() invalid = false;
  @Output() save = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
