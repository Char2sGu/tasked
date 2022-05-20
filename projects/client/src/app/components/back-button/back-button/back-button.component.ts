import { Component, Input, OnInit } from '@angular/core';

import { RouterHistory } from '../../../core/router-history.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  @Input() mode: 'relative' | 'history' = 'relative';

  destination!: string;

  constructor(private routerHistory: RouterHistory) {}

  ngOnInit(): void {
    this.destination =
      this.mode === 'relative' ? '..' : this.routerHistory.previous ?? '..';
  }
}
