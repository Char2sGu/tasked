import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecting-team-illustration',
  templateUrl: './selecting-team-illustration.component.html',
  styleUrls: ['./selecting-team-illustration.component.scss'],
})
export class SelectingTeamIllustrationComponent implements OnInit {
  @HostBinding('class') class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
