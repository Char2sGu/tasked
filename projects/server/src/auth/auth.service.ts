import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { Repository } from '../mikro/repository.class';
import { User } from '../users/entities/user.entity';
import { VerificationsService } from '../verifications/verifications.service';
import { AuthTokenService } from './auth-token/auth-token.service';
import { LoginArgs, RegisterArgs } from './dto/auth.args';
import { LoginResult, RegisterResult } from './dto/auth.objects';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private authTokenService: AuthTokenService,
    private verificationsService: VerificationsService,
  ) {}

  async login({ username, password }: LoginArgs): Promise<LoginResult> {
    const user = await this.repo.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid username or password');
    const token = await this.authTokenService.sign(user);
    return { user, token };
  }

  async register({ data }: RegisterArgs): Promise<RegisterResult> {
    const user = this.repo.create(data);
    await this.repo.flush();
    const token = await this.authTokenService.sign(user);
    const verification = await this.verificationsService.request({}, user);
    return { user, verification, token };
  }
}
