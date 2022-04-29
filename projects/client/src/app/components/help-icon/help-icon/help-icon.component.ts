import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// TODO: remove snackbar, as tooltips will open on long touch on mobile

@Component({
  selector: 'app-help-icon',
  templateUrl: './help-icon.component.html',
  styleUrls: ['./help-icon.component.scss'],
})
export class HelpIconComponent implements OnInit {
  @Input() message = '';

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  showSnackbar(): void {
    if (this.message)
      this.snackbar.open(this.message, $localize`Got it`, {
        duration: 5000,
      });
  }
}
