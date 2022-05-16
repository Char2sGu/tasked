import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { Repository } from '../../mikro/repository.class';
import { TeamsService } from '../teams/teams.service';
import { UserCreateInput } from '../users/dto/user.inputs';
import { User } from '../users/entities/user.entity';
import { VerificationsService } from '../verifications/verifications.service';
import { AuthTokenService } from './auth-token/auth-token.service';
import { LoginResult, RegisterResult } from './dto/auth.objects';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private authTokenService: AuthTokenService,
    private verificationsService: VerificationsService,
    private teamsService: TeamsService,
  ) {}

  async login(username: string, password: string): Promise<LoginResult> {
    const user = await this.repo.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid username or password');
    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid username or password');
    const token = await this.authTokenService.sign(user);
    return { user, token };
  }

  async register(data: UserCreateInput): Promise<RegisterResult> {
    const user = this.repo.create(data);
    await this.repo.flush();
    const token = await this.authTokenService.sign(user);
    const verification = await this.verificationsService.request({}, user);
    await this.teamsService.createOne({ data: { name: 'My Team' } });
    return { user, verification, token };
  }
}
