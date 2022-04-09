import { Component, OnInit } from '@angular/core';

import { ThemeService } from '../../../theme/theme.service';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
})
export class ThemeButtonComponent implements OnInit {
  constructor(public theme: ThemeService) {}

  ngOnInit(): void {}
}
