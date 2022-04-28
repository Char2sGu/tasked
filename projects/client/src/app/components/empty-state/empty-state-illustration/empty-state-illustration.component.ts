import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state-illustration',
  templateUrl: './empty-state-illustration.component.html',
  styleUrls: ['./empty-state-illustration.component.scss'],
})
export class EmptyStateIllustrationComponent implements OnInit {
  @HostBinding('class') class = 'block';
  @Input() headline?: string;
  @Input() message?: string;

  constructor() {}

  ngOnInit(): void {}
}
