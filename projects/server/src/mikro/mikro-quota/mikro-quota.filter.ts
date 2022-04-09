import { AnyEntity } from '@mikro-orm/core';
import { Catch, ExceptionFilter, ForbiddenException } from '@nestjs/common';

import { MikroQuotaError } from './mikro-quota.error';

/**
 * Convert {@link MikroQuotaError}s into {@link ForbiddenException}s.
 */
@Catch(MikroQuotaError)
export class MikroQuotaFilter
  implements ExceptionFilter<MikroQuotaError<AnyEntity>>
{
  catch<Entity extends object>(exception: MikroQuotaError<Entity>): void {
    throw new ForbiddenException(
      `Cannot perform this operation because the quota is exceeded. (${exception.current}/${exception.quota})`,
    );
  }
}
