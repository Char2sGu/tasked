import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { ApplicationState } from '../shared/application-state.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  @Input() scrollableContainer?: HTMLElement;

  constructor(public auth: AuthService, public state: ApplicationState) {}

  ngOnInit(): void {}
}
