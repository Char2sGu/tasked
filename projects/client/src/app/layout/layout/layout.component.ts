import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Breakpoint } from '../../common/breakpoint.enum';
import { ThemeService } from '../../core/theme.service';

export type LayoutContent = TemplateRef<never> | null;

@Injectable()
export class LayoutContents {
  headerActions$ = new BehaviorSubject<LayoutContent>(null);
  sidenav$ = new BehaviorSubject<LayoutContent>(null);
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LayoutContents],
})
export class LayoutComponent implements OnInit {
  theme$ = this.themeService.current.value$$;

  desktop$ = this.breakpointObserver
    .observe(Breakpoint.XLarge)
    .pipe(map((state) => state.matches));

  constructor(
    public contents: LayoutContents,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {}
}
