import { transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, debounceTime, map, Observable } from 'rxjs';

import { FadeThroughAnimation } from '../../common/animations';
import { Breakpoint } from '../../common/breakpoint.enum';
import { ThemeService } from '../../core/theme.service';

export type LayoutContent = TemplateRef<never> | null;

@Injectable()
export class LayoutContents {
  headerActions$$ = new BehaviorSubject<LayoutContent>(null);
  headerActions$ = this.refine(this.headerActions$$);
  sidenav$$ = new BehaviorSubject<LayoutContent>(null);
  sidenav$ = this.refine(this.sidenav$$);

  private refine(source: Observable<LayoutContent>): Observable<LayoutContent> {
    return source.pipe(debounceTime(100));
  }
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LayoutContents],
  animations: [
    trigger('fadeThrough', [
      transition('* => *', FadeThroughAnimation.apply()),
    ]),
  ],
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
