import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AUTH_GUARD_SKIP } from './auth-guard-skip.symbol';

/**
 * Apply to a routing method to skip the authentication check.
 * @see AuthGuard
 * @returns
 */
export const AuthGuardSkip = (): CustomDecorator<typeof AUTH_GUARD_SKIP> =>
  SetMetadata(AUTH_GUARD_SKIP, true);

AuthGuard;
