import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
