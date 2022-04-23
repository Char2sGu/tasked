import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-illustration',
  templateUrl: './add-task-illustration.component.html',
  styleUrls: ['./add-task-illustration.component.scss'],
})
export class AddTaskIllustrationComponent implements OnInit {
  @HostBinding() class = 'block';

  constructor() {}

  ngOnInit(): void {}
}
