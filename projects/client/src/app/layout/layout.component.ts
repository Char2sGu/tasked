import { BreakpointObserver } from '@angular/cdk/layout';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  Injectable,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, debounceTime, map, Observable } from 'rxjs';

import { Breakpoint } from '../common/breakpoint.enum';
import { ThemeService } from '../core/theme.service';

export type LayoutContent = TemplateRef<LayoutContentContext> | null;
export type LayoutContentContext = {
  sidenav: MatSidenav;
};

@Injectable()
export class LayoutContents {
  header$ = new BehaviorSubject<LayoutContent>(null);
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

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  header$ = this.useContent(this.contents.header$);
  sidenav$ = this.useContent(this.contents.sidenav$);

  constructor(
    private contents: LayoutContents,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {}

  private useContent(content$: Observable<LayoutContent>) {
    return content$.pipe(
      debounceTime(100),
      map(
        (content) =>
          content &&
          new TemplatePortal<LayoutContentContext>(
            content,
            this.viewContainerRef, // logical view container where the portal lives but not renders
            { sidenav: this.sidenav },
          ),
      ),
    );
  }
}
