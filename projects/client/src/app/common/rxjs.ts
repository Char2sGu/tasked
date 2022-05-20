import { Type } from '@angular/core';
import { filter, Observable, OperatorFunction, timer } from 'rxjs';

export const skipNullable = <T>(): OperatorFunction<T, NonNullable<T>> =>
  filter((v): v is NonNullable<T> => !!v);

export const takeInstanceOf = <T, R>(type: Type<R>): OperatorFunction<T, R> =>
  filter((v: unknown): v is R => v instanceof type);

export const postpone =
  (time: number) =>
  <T>(source: Observable<T>): Observable<T> =>
    new Observable<T>((subscriber) => {
      let postponed:
        | (['value', T] | ['error', Error] | ['complete', null])[]
        | null = [];

      timer(time).subscribe(() => {
        postponed!.forEach(([action, payload]) => {
          if (action === 'value') subscriber.next(payload as T);
          else if (action === 'error') subscriber.error(payload);
          else if (action === 'complete') subscriber.complete();
        });
        postponed = null;
      });

      source.subscribe({
        next: (value) => {
          if (postponed) postponed.push(['value', value]);
          else subscriber.next(value);
        },
        error: (error) => {
          if (postponed) postponed.push(['error', error]);
          else subscriber.error(error);
        },
        complete: () => {
          if (postponed) postponed.push(['complete', null]);
          else subscriber.complete();
        },
      });
    });
