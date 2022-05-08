import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { finalize, from, map, Observable, shareReplay, tap } from 'rxjs';

import {
  MembershipRequestListGQL,
  MembershipRequestListQuery,
} from '../../../graphql/codegen';

export type MembershipRequest =
  MembershipRequestListQuery['membershipRequests']['results'][number];
export type MembershipRequestGroup = [string, MembershipRequest[]];

@Injectable()
export class MembershipRequestState {
  readonly query = this.listGql.watch();
  readonly membershipRequestGroups$ = this.useQuery();
  loadingMore = false;
  loadingMoreNeeded = false;

  constructor(
    private datePipe: DatePipe,
    private listGql: MembershipRequestListGQL,
  ) {}

  fetchMore(): void {
    if (!this.loadingMoreNeeded || this.loadingMore) return;

    const data = this.query.getCurrentResult().data.membershipRequests;
    this.loadingMore = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(finalize(() => (this.loadingMore = false)))
      .subscribe((result) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          membershipRequests: {
            ...prev.membershipRequests,
            results: [
              ...prev.membershipRequests.results,
              ...result.data.membershipRequests.results,
            ],
          },
        }));
      });
  }

  private useQuery(): Observable<MembershipRequestGroup[]> {
    return this.query.valueChanges.pipe(
      map((result) => result.data.membershipRequests),
      tap(({ results, total }) => {
        this.loadingMoreNeeded = results.length < total;
      }),
      map((data) => data.results),
      map((items) => {
        const groups: Record<string, MembershipRequest[]> = {};
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
