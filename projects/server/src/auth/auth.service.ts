import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { Repository } from '../mikro/repository.class';
import { User } from '../users/entities/user.entity';
import { AuthTokenService } from './auth-token/auth-token.service';
import { LoginArgs, RegisterArgs } from './dto/auth.args';
import { LoginResult, RegisterResult } from './dto/auth.objects';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private authTokenService: AuthTokenService,
  ) {}

  async login({ username, password }: LoginArgs): Promise<LoginResult> {
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid username or password');
    const token = await this.authTokenService.sign(user);
    return { user, token };
  }

  async register({ data }: RegisterArgs): Promise<RegisterResult> {
    const user = this.userRepo.create(data);
    await this.userRepo.flush();
    const token = await this.authTokenService.sign(user);
    return { user, token };
  }
}
