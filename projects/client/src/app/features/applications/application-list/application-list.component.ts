import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import {
  ApplicationListGQL,
  ApplicationListQuery,
  ApplicationListQueryVariables,
} from '../../../graphql';
import { AuthService } from '../../auth/auth.service';

type Application = ApplicationListQuery['applications']['results'][number];

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  viewProviders: [DatePipe],
})
export class ApplicationListComponent implements OnInit {
  @Input() scrollableContainer?: HTMLElement;
  applicationGroups$!: Observable<[string, Application[]][]>;
  loadingInitial = true;
  loadingMore = false;
  loadingMoreNeeded = false;

  private query!: QueryRef<ApplicationListQuery, ApplicationListQueryVariables>;

  constructor(
    public auth: AuthService,
    private datePipe: DatePipe,
    private listGql: ApplicationListGQL,
  ) {}

  ngOnInit(): void {
    this.query = this.listGql.watch();
    this.applicationGroups$ = this.query.valueChanges.pipe(
      map((result) => result.data.applications),
      tap(({ results, total }) => {
        this.loadingInitial = false;
        this.loadingMoreNeeded = results.length < total;
      }),
      map((data) => data.results),
      map((items) => {
        const groups: Record<string, Application[]> = {};
        items.forEach((item) => {
          const key = this.datePipe.transform(item.createdAt)!;
          const group = (groups[key] = groups[key] ?? []);
          group.push(item);
        });
        return Object.entries(groups);
      }),
    );
  }

  fetchMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    const data = this.query.getCurrentResult().data.applications;
    this.loadingMore = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(finalize(() => (this.loadingMore = false)))
      .subscribe((result) => {
        const scrollTop = this.scrollableContainer?.scrollTop;
        this.query.updateQuery((prev) => ({
          ...prev,
          applications: {
            ...prev.applications,
            results: [
              ...prev.applications.results,
              ...result.data.applications.results,
            ],
          },
        }));
        setTimeout(() => {
          this.scrollableContainer?.scrollTo({ top: scrollTop });
        });
      });
  }
}
