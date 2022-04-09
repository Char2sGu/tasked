import { Observable, timer } from 'rxjs';

export const postpone =
  (time: number) =>
  <T>(source: Observable<T>): Observable<T> => {
    return new Observable<T>((subscriber) => {
      let postponed:
        | (['value', T] | ['error', Error] | ['complete', null])[]
        | null = [];

      timer(time).subscribe(() => {
        postponed!.forEach(([action, payload]) => {
          if (action == 'value') subscriber.next(payload as T);
          else if (action == 'error') subscriber.error(payload);
          else if (action == 'complete') subscriber.complete();
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
  };
