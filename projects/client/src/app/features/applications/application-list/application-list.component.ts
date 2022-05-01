import { Component, Input, OnInit, TrackByFunction } from '@angular/core';

import { AuthService } from '../../../core/auth.service';
import {
  Application,
  ApplicationState,
} from '../shared/application-state.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  @Input() scrollableContainer?: HTMLElement;
  itemTracker: TrackByFunction<Application> = (_, item) => item.id;

  constructor(public auth: AuthService, public state: ApplicationState) {}

  ngOnInit(): void {}
}
