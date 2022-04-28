import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgxMasonryComponent } from 'ngx-masonry';
import { bufferTime, Subject } from 'rxjs';

@Directive({
  selector: 'ngx-masonry',
})
export class MasonryAutoResizeDirective implements OnInit, OnDestroy {
  private observer = new ResizeObserver(() => this.resize$.next(undefined));
  private resize$ = new Subject();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private masonry: NgxMasonryComponent,
  ) {
    this.masonry.options.resize = false;
    this.masonry.options.percentPosition = true;
  }

  ngOnInit(): void {
    this.observer.observe(this.elementRef.nativeElement);
    this.resize$.pipe(bufferTime(200)).subscribe(() => this.masonry.layout());
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.elementRef.nativeElement);
  }
}
