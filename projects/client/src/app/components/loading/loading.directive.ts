import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective {
  @Input() appLoadingDiameter?: number;
  @Input() appLoadingColor: ThemePalette = 'primary';

  @Input()
  set appLoading(loading: boolean) {
    this.viewContainerRef.clear();
    if (loading) this.createSpinner();
    else this.createContent();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  private createContent() {
    return this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private createSpinner() {
    const spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
    spinner.instance.mode = 'indeterminate';
    if (this.appLoadingDiameter)
      spinner.instance.diameter = this.appLoadingDiameter;
    if (this.appLoadingColor) spinner.instance.color = this.appLoadingColor;

    const $spinner: HTMLElement = spinner.instance._elementRef.nativeElement;
    $spinner.setAttribute('style', 'display: inline-block');

    return spinner;
  }
}
