import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'node:http';

import { User } from '../users/entities/user.entity';
import { AuthResult } from './dto/auth-result.obj.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: EntityRepository<User>,
    private jwt: JwtService,
  ) {}

  async obtainJwt(
    username: string,
    password: string,
  ): Promise<AuthResult | void> {
    const user = await this.userRepo.findOne({ username });
    if (!user) return;

    const isValid = await bcryptjs.compare(password, user.password);
    if (isValid) {
      const token = await this.signJwt(user);
      return { token, user };
    }
  }

  async verifyJwt(token?: string): Promise<User> {
    try {
      if (!token) throw new UnauthorizedException();
      const { id } = await this.jwt.verifyAsync<JwtData>(token);
      const user = await this.userRepo.findOne(id);
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (error) {
      if (error instanceof TokenExpiredError) throw new UnauthorizedException();
      throw error;
    }
  }

  getJwtFromHeaders(headers: IncomingHttpHeaders): string | undefined {
    const token = headers.authorization?.slice(7); // `7` is the length of the prefix "Bearer "
    if (!token) throw new UnauthorizedException();
    return token;
  }

  private async signJwt(user: User) {
    const { id, username } = user;
    const data: JwtData = { id, username };
    return this.jwt.signAsync(data);
  }
}

interface JwtData {
  id: number;
  username: string;
}
