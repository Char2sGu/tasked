import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ApplicationState } from './shared/application-state.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  providers: [DatePipe, ApplicationState],
})
export class ApplicationsComponent implements OnInit {
  constructor(public state: ApplicationState) {}

  ngOnInit(): void {}
}
