import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationConfig } from '../confirmation.directive';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public config: ConfirmationConfig) {}

  ngOnInit(): void {}
}
