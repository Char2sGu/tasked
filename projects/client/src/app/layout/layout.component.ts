import { BreakpointObserver } from '@angular/cdk/layout';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  forwardRef,
  Injectable,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, debounceTime, first, map, Observable } from 'rxjs';

import { Breakpoint } from '../common/breakpoint.enum';
import { ThemeService } from '../core/theme.service';

// TODO: close bottom navigator on navigation

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [forwardRef(() => LayoutContents)],
})
export class LayoutComponent implements OnInit {
  theme$ = this.themeService.current.value$$;

  isBreakpointXLargeMatched$ = this.breakpointObserver
    .observe(Breakpoint.XLarge)
    .pipe(map((state) => state.matches));
  isBreakpointSmallMatched$ = this.breakpointObserver
    .observe(Breakpoint.Small)
    .pipe(map((state) => state.matches));

  headerContent$ = this.useContent(this.contents.header$);
  navigationContent$ = this.useContent(this.contents.navigation$);

  @ViewChild(MatSidenav) private sidenav!: MatSidenav;
  @ViewChild('bottomSheet') private bottomSheet!: TemplateRef<never>;
  private contentContext: LayoutContentContext = {
    navigator: { toggle: () => this.toggleNavigator() },
  };

  constructor(
    private contents: LayoutContents,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private viewContainerRef: ViewContainerRef,
    private bottomSheetService: MatBottomSheet,
  ) {}

  ngOnInit(): void {}

  private useContent(content$: Observable<LayoutContent>) {
    return content$.pipe(
      debounceTime(100),
      map(
        (content) =>
          content &&
          new TemplatePortal(
            content,
            this.viewContainerRef, // logical view container where the portal lives but not renders
            this.contentContext,
          ),
      ),
    );
  }

  private toggleNavigator() {
    this.isBreakpointSmallMatched$
      .pipe(first())
      .subscribe((isLargerThanSmall) =>
        isLargerThanSmall
          ? this.sidenav.toggle()
          : this.bottomSheetService.open(this.bottomSheet),
      );
  }
}

@Injectable()
export class LayoutContents {
  header$ = new BehaviorSubject<LayoutContent>(null);
  navigation$ = new BehaviorSubject<LayoutContent>(null);
}

export type LayoutContent = TemplateRef<LayoutContentContext> | null;
export type LayoutContentContext = {
  navigator: { toggle(): void };
};
