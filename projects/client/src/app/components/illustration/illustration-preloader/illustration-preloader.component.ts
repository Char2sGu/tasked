import { Component, OnInit } from '@angular/core';

import { ILLUSTRATION_NAMES } from '../illustration-names';

@Component({
  selector: 'app-illustration-preloader',
  templateUrl: './illustration-preloader.component.html',
  styleUrls: ['./illustration-preloader.component.scss'],
})
export class IllustrationPreloaderComponent implements OnInit {
  names = ILLUSTRATION_NAMES;

  constructor() {}

  ngOnInit(): void {}
}
