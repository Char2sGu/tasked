import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { delay, finalize } from 'rxjs';

import { NotificationType } from '../../../common/notification-type.enum';
import { ModalRef } from '../../../components/modal/modal.directive';
import { TaskUpdateGQL } from '../../../graphql';
import { Task } from '../room-detail-tasks/room-detail-tasks.component';

@Component({
  selector: 'app-room-detail-tasks-item-edit-popup',
  templateUrl: './room-detail-tasks-item-edit-popup.component.html',
  styleUrls: ['./room-detail-tasks-item-edit-popup.component.scss'],
})
export class RoomDetailTasksItemEditPopupComponent
  implements OnInit, AfterViewInit
{
  @Input() task?: Task;
  data = { title: '', description: '' };
  modified = false;
  loading = false;

  @ViewChild(NgForm) form!: NgForm;

  constructor(
    private modal: ModalRef,
    private notifier: NotifierService,
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
          this.notifier.notify(NotificationType.Success, 'Task updated');
          this.modal.close();
        },
        error: () => {
          this.notifier.notify(NotificationType.Error, 'Update failed');
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
