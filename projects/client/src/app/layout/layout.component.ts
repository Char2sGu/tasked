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
import { BehaviorSubject, debounceTime, first, map, Observable } from 'rxjs';

import { Breakpoint } from '../common/breakpoint.enum';
import { ModalDirective } from '../components/modal/modal.directive';
import { ThemeService } from '../core/theme.service';

// TODO: beautify bottom navigator

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

  @ViewChild(MatSidenav) navigatorSide!: MatSidenav;
  @ViewChild(ModalDirective) navigatorBottom!: ModalDirective;
  private contentContext: LayoutContentContext = {
    navigator: { toggle: () => this.toggleNavigator() },
  };

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
          ? this.navigatorSide.toggle()
          : this.navigatorBottom.openSheet(),
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
