import { Component, OnInit } from '@angular/core';

import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  theme$ = this.themeService.current.value$$;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  switch(): void {
    this.themeService.toggle();
  }
}
