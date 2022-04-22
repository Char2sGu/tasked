import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { finalize, from, map, Observable, shareReplay, tap } from 'rxjs';

import { ApplicationListGQL, ApplicationListQuery } from '../../../graphql';

export type Application =
  ApplicationListQuery['applications']['results'][number];
export type ApplicationGroup = [string, Application[]];

@Injectable()
export class ApplicationState {
  readonly query = this.listGql.watch();
  readonly applicationGroups$ = this.useQuery();
  loadingMore = false;
  loadingMoreNeeded = false;

  constructor(
    private datePipe: DatePipe,
    private listGql: ApplicationListGQL,
  ) {}

  fetchMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    const data = this.query.getCurrentResult().data.applications;
    this.loadingMore = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(finalize(() => (this.loadingMore = false)))
      .subscribe((result) => {
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
      });
  }

  private useQuery(): Observable<ApplicationGroup[]> {
    return this.query.valueChanges.pipe(
      map((result) => result.data.applications),
      tap(({ results, total }) => {
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
      shareReplay(1),
    );
  }
}
