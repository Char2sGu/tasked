import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss'],
})
export class RadioListComponent<T> implements OnInit {
  @Input() value?: T;
  @Output() valueChange = new EventEmitter<T>();
  @Input() options: RadioListOption[] = [];

  constructor() {}

  ngOnInit(): void {}
}

export interface RadioListOption {
  value: unknown;
  text: string;
}
