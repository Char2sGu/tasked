import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data-illustration',
  templateUrl: './no-data-illustration.component.html',
  styleUrls: ['./no-data-illustration.component.scss'],
})
export class NoDataIllustrationComponent implements OnInit {
  @HostBinding() class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
