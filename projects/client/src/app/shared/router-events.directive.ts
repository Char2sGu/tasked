import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[navigation]',
})
export class RouterEventsDirective implements OnInit, OnDestroy {
  @Output() navigation = new EventEmitter();

  private subscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.navigation.emit();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
