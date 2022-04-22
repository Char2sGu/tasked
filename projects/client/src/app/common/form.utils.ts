export function isEmpty(target: object): boolean {
  return !!Object.keys(target).length;
}

export function filterKeys<T>(
  obj: T,
  filter: <K extends keyof T>(value: T[K], key: K) => boolean = (v) => !!v,
): Pick<T, keyof T> {
  const keys = Object.keys(obj) as (keyof T)[];
  const passed = keys.filter((key) => filter(obj[key], key));
  return pick(obj, passed);
}

export function pick<T, K extends keyof T>(
  source: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => (result[key] = source[key]));
  return result;
}
