import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

import { TeamDetailComponent } from './team-detail.component';

@Directive({
  selector: '[appTeamDetailLayout]',
})
export class TeamDetailLayoutDirective implements OnInit {
  @Input() appTeamDetailLayout?: 'header';

  constructor(
    private host: TeamDetailComponent,
    private templateRef: TemplateRef<never>,
  ) {}

  ngOnInit(): void {
    if (!this.appTeamDetailLayout) return;
    setTimeout(() => {
      this.host.header = this.templateRef;
    });
  }
}
