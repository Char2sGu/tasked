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
import { MatSidenav } from '@angular/material/sidenav';
import {
  BehaviorSubject,
  concat,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
} from 'rxjs';

import { Breakpoint } from '../common/breakpoint.enum';
import { skipFalsy } from '../common/rxjs';
import { ModalDirective } from '../components/modal/modal.directive';
import { RouterStatus } from '../core/router-status.service';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [forwardRef(() => LayoutConfiguration)],
})
export class LayoutComponent implements OnInit {
  theme$ = this.themeService.theme$;

  isBreakpointXLargeMatched$ = this.breakpointObserver
    .observe(Breakpoint.XLarge)
    .pipe(map((state) => state.matches));
  isBreakpointSmallMatched$ = this.breakpointObserver
    .observe(Breakpoint.Small)
    .pipe(map((state) => state.matches));

  contents = {
    header: this.useContent(this.configuration.header$),
    navigation: this.useContent(this.configuration.navigation$),
  };

  loading$ = this.routerStatus.navigatingAndLoading$;

  @ViewChild(MatSidenav) navigatorSide?: MatSidenav;
  @ViewChild(ModalDirective) navigatorBottom?: ModalDirective;

  private contentContext: LayoutContentContext = {
    navigator: { toggle: () => this.toggleNavigator() },
  };

  constructor(
    private configuration: LayoutConfiguration,
    private routerStatus: RouterStatus,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.routerStatus.navigating$
      .pipe(skipFalsy())
      .subscribe(() => this.closeNavigator());
  }

  private useContent(content$: Observable<LayoutContent>) {
    return concat(
      content$.pipe(skipFalsy(), first()), // do not debounce initial content to prevent flickering
      content$.pipe(debounceTime(100)),
    ).pipe(
      distinctUntilChanged(),
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
      .subscribe((isLargerThanSmall) => {
        if (isLargerThanSmall) this.navigatorSide?.toggle();
        else this.navigatorBottom?.openSheet(); // bottom navigator is definitely closed at this point
      });
  }

  private closeNavigator() {
    this.isBreakpointXLargeMatched$.pipe(first()).subscribe((isDesktop) => {
      if (!isDesktop) this.navigatorSide?.close();
      this.navigatorBottom?.close();
    });
  }
}

@Injectable()
export class LayoutConfiguration {
  header$ = new BehaviorSubject<LayoutContent>(null);
  navigation$ = new BehaviorSubject<LayoutContent>(null);
}

export type LayoutContent = TemplateRef<LayoutContentContext> | null;
export type LayoutContentContext = {
  navigator: { toggle(): void };
};
