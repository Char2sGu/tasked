import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter();

  theme$ = this.themeService.current.value$$;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
}
