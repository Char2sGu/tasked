import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  element;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {}
}
