import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Directive({
  selector: '[appConfirmation]',
  exportAs: 'appConfirmation',
})
export class ConfirmationDirective {
  @Input('appConfirmation') config?: ConfirmationConfig;
  @Input('appConfirmationTriggerOnClick') triggerOnClick = true;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private dialogService: MatDialog) {}

  @HostListener('click')
  onClick(): void {
    if (this.triggerOnClick) this.trigger();
  }

  trigger(): void {
    const {
      title = 'Continue?',
      message = 'Are you sure you want to continue?',
      action = 'Confirm',
    } = this.config ?? {};
    const config: ConfirmationConfig = { title, message, action };
    this.dialogService
      .open(ConfirmationDialogComponent, {
        data: config,
        width: '280px',
        minHeight: '208px',
      })
      .componentInstance.confirm.subscribe(() => this.confirm.emit());
  }
}

export interface ConfirmationConfig {
  title: string;
  message: string;
  action: string;
}
