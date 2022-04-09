export const Orderable =
  () =>
  ({ constructor: target }: object, field: string): void => {
    const fields: Set<string> =
      Reflect.getOwnMetadata(ORDERABLE, target) ??
      new Set(Reflect.getMetadata(ORDERABLE, target)); // inherit parent metadata
    Reflect.defineMetadata(ORDERABLE, fields.add(field), target);
  };

export const ORDERABLE = Symbol('orderable');
