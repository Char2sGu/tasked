/**
 * All illustrations come from https://undraw.co/.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddTaskIllustrationComponent } from './add-task-illustration/add-task-illustration.component';
import { NoDataIllustrationComponent } from './no-data-illustration/no-data-illustration.component';
import { SelectingTeamIllustrationComponent } from './selecting-team-illustration/selecting-team-illustration.component';

// TODO: load illustrations on demand

@NgModule({
  declarations: [
    NoDataIllustrationComponent,
    AddTaskIllustrationComponent,
    SelectingTeamIllustrationComponent,
  ],
  imports: [CommonModule],
  exports: [
    NoDataIllustrationComponent,
    AddTaskIllustrationComponent,
    SelectingTeamIllustrationComponent,
  ],
})
export class IllustrationsModule {}
