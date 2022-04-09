import { Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

import { ThemeService } from './theme.service';

@Directive({
  selector: 'mat-form-field',
})
export class ThemedFormFieldDirective implements OnInit, OnDestroy {
  @Input() themed = true;

  private subscription!: Subscription;

  constructor(
    private theme: ThemeService,
    @Host() private matFormField: MatFormField,
  ) {}

  ngOnInit(): void {
    this.subscription = this.theme.current.value$$.subscribe((theme) => {
      if (this.themed)
        this.matFormField.color = theme == 'light' ? 'primary' : 'accent';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
