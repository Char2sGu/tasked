import { Module } from '@nestjs/common';

import { MikroModule } from '../mikro/mikro.module';
import { ValidationModule } from '../validation/validation.module';
import { ExecutionContextHelper } from './execution-context/execution-context.helper';

/**
 * Provide shared providers for every feature providers.
 */
@Module({
  imports: [ValidationModule.forFeature(), MikroModule.forFeature()],
  providers: [ExecutionContextHelper],
  exports: [ValidationModule, MikroModule, ExecutionContextHelper],
})
export class SharedModule {}
