import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { User } from '../users/entities/user.entity';
import { AuthTokenService } from './auth-token/auth-token.service';
import { AuthResult } from './dto/auth-result.obj.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: EntityRepository<User>,
    private authTokenService: AuthTokenService,
  ) {}

  async auth(username: string, password: string): Promise<AuthResult> {
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid username or password');
    const token = await this.authTokenService.sign(user);
    return { token, user };
  }
}
