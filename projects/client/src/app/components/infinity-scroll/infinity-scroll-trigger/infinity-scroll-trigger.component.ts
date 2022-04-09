import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-infinity-scroll-trigger',
  templateUrl: './infinity-scroll-trigger.component.html',
  styleUrls: ['./infinity-scroll-trigger.component.scss'],
})
export class InfinityScrollTriggerComponent implements OnInit {
  @Output() trigger = new EventEmitter();
  @Input() loading = false;

  constructor() {}

  ngOnInit(): void {}

  handleObservation(entires: IntersectionObserverEntry[]): void {
    if (entires.length == 1) {
      const entry = entires[0];
      if (entry.isIntersecting) this.trigger.emit();
    }
  }
}
