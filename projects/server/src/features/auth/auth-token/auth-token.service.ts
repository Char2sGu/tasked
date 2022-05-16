import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

import { Repository } from '../../../mikro/repository.class';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthTokenService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async sign(user: User): Promise<string> {
    const { id, username, email } = user;
    const payload: AuthTokenPayload = { id, username, email };
    return this.jwtService.signAsync(payload);
  }

  async parseAndVerify(token: string): Promise<User> {
    const { id } = await this.jwtService.verifyAsync<AuthTokenPayload>(token);
    const user = await this.userRepo.findOne(id);
    if (!user) throw new TokenExpiredError('Invalid payload', new Date());
    return user;
  }
}

export interface AuthTokenPayload {
  id: number;
  username: string;
  email?: string;
}
