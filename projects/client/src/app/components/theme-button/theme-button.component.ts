import { Component, OnInit } from '@angular/core';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
})
export class ThemeButtonComponent implements OnInit {
  theme$ = this.themeService.theme$;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.themeService.toggle();
  }
}
