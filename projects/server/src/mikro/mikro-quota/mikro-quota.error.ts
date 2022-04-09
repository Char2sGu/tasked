export class MikroQuotaError<Entity extends object> extends Error {
  constructor(
    public entity: Entity,
    public field: keyof Entity,
    public quota: number,
    public current: number,
  ) {
    super(
      `[${entity.constructor.name}.${field}]: Quota exceeded. (${current}/${quota})`,
    );
  }
}
