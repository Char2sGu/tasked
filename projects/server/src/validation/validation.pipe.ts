import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationPipe as ValidationPipeBase,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe
  extends ValidationPipeBase
  implements PipeTransform
{
  constructor() {
    super({
      transform: true,
      transformOptions: {
        exposeDefaultValues: true, // `@Field(..., { defaultValue: ... })` cannot work in `@ResolveField()` (Bug)
        exposeUnsetFields: false, // if `true`, update actions will unexpectedly assign an `undefined` value to the entity fields and cause error
      },
      whitelist: true,
    });
  }

  async transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    return super.transform(value, metadata);
  }
}
