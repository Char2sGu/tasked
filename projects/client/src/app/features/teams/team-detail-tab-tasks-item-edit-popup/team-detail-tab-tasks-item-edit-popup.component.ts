import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, finalize } from 'rxjs';

import { ModalRef } from '../../../components/modal/modal.directive';
import { Notifier } from '../../../core/notifier.service';
import { TaskUpdateGQL } from '../../../graphql/codegen';
import { Task } from '../team-detail-tab-tasks/team-detail-tab-tasks.component';

@Component({
  selector: 'app-team-detail-tab-tasks-item-edit-popup',
  templateUrl: './team-detail-tab-tasks-item-edit-popup.component.html',
  styleUrls: ['./team-detail-tab-tasks-item-edit-popup.component.scss'],
})
export class TeamDetailTabTasksItemEditPopupComponent
  implements OnInit, AfterViewInit
{
  @Input() task?: Task;
  data = { title: '', description: '' };
  modified = false;
  loading = false;

  @ViewChild(NgForm) form!: NgForm;

  constructor(
    private modal: ModalRef,
    private notifier: Notifier,
    private updateGql: TaskUpdateGQL,
  ) {}

  ngOnInit(): void {
    if (!this.task) return;
    const { title, description } = this.task;
    this.data.title = title;
    this.data.description = description || '';
  }

  ngAfterViewInit(): void {
    this.form.valueChanges?.pipe(delay(0)).subscribe(() => {
      this.modified = this.checkModified();
    });
  }

  onSubmit(): void {
    const task = this.task;
    if (!task) return;
    this.loading = true;
    this.updateGql
      .mutate({ id: task.id, data: this.data })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.modified = false;
          this.notifier.success('Task updated');
          this.modal.close();
        },
        error: () => {
          this.notifier.error('Failed to update');
        },
      });
  }

  private checkModified(): boolean {
    return (
      this.data.title !== this.task?.title ||
      this.data.description !== this.task?.description
    );
  }
}
