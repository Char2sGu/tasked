import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state-illustration',
  templateUrl: './empty-state-illustration.component.html',
  styleUrls: ['./empty-state-illustration.component.scss'],
})
export class EmptyStateIllustrationComponent implements OnInit {
  @Input() headline?: string;
  @Input() message?: string;

  constructor() {}

  ngOnInit(): void {}
}
