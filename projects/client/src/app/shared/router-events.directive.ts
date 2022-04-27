import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[navigationStart],[navigationEnd]',
})
export class RouterEventsDirective implements OnInit, OnDestroy {
  @Output() navigationStart = new EventEmitter();
  @Output() navigationEnd = new EventEmitter();

  private subscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.navigationStart.emit();
      if (event instanceof NavigationEnd) this.navigationEnd.emit();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
