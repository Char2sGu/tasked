import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-refetch-button',
  templateUrl: './refetch-button.component.html',
  styleUrls: ['./refetch-button.component.scss'],
})
export class RefetchButtonComponent implements OnInit {
  @Output() refetch = new EventEmitter();
  loading = false;
  disabled = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  onClick(): void {
    if (this.disabled) return;
    this.disabled = true;
    this.loading = true;
    from(this.apollo.client.refetchQueries({ include: 'active' }))
      .pipe(
        tap(() => {
          this.refetch.emit();
        }),
        finalize(() => {
          this.loading = false;
          this.disabled = false;
        }),
      )
      .subscribe();
  }
}
