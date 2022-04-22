import { filter, OperatorFunction } from 'rxjs';

export const skipFalsy = <T>(): OperatorFunction<T, NonNullable<T>> =>
  filter((v): v is NonNullable<T> => !!v);
