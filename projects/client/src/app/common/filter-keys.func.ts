import { pick } from './pick.func';

export function filterKeys<T>(
  obj: T,
  filter: Filter<T> = (v) => !!v,
): Pick<T, keyof T> {
  const keys = Object.keys(obj) as (keyof T)[];
  const passed = keys.filter((key) => filter(obj[key], key));
  return pick(obj, passed);
}

type Filter<T> = <K extends keyof T>(value: T[K], key: K) => boolean;
