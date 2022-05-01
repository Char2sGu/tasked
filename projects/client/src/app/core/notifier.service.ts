import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export abstract class Notifier {
  constructor() {}
  abstract info(message: string): void;
  abstract success(message: string): void;
  abstract error(message: string): void;
  abstract clear(): void;
}

@Injectable()
export class SnackbarNotifier implements Notifier {
  constructor(private snackbarService: MatSnackBar) {}

  info(message: string): void {
    this.snackbarService.open(message, 'OK', { duration: 3000 });
  }
  success(message: string): void {
    this.snackbarService.open(message, 'Got it', { duration: 3000 });
  }
  error(message: string): void {
    this.snackbarService.open(message, 'Fine', { duration: 3000 });
  }
  clear(): void {
    this.snackbarService.dismiss();
  }
}
