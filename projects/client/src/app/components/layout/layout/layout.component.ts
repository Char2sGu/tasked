import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  private loading$$ = new BehaviorSubject<boolean>(false);

  @ViewChild('spinner')
  private spinnerTemplateRef!: TemplateRef<never>;
  private spinnerOverlayRef!: OverlayRef;

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
  ) {
    this.loading$ = this.loading$$.pipe(
      debounceTime(100),
      tap((v) => (v ? this.showSpinner() : this.hideSpinner())),
    );
  }

  ngOnInit(): void {
    this.spinnerOverlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.loading$$.next(true);
      else if (event instanceof NavigationEnd) this.loading$$.next(false);
    });
  }

  ngOnDestroy(): void {
    this.spinnerOverlayRef.dispose();
  }

  private showSpinner() {
    this.spinnerOverlayRef.attach(
      new TemplatePortal(this.spinnerTemplateRef, this.viewContainerRef),
    );
  }

  private hideSpinner() {
    this.spinnerOverlayRef.detach();
  }
}
