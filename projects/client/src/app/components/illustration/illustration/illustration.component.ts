import { Component, Input, OnInit } from '@angular/core';

import { IllustrationName } from '../illustration-names';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.scss'],
})
export class IllustrationComponent implements OnInit {
  @Input() name?: IllustrationName;

  constructor() {}

  ngOnInit(): void {}
}
