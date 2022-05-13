import faker from '@faker-js/faker';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import dayjs, { Dayjs } from 'dayjs';

import { Repository } from '../mikro/repository.class';
import { User } from '../users/entities/user.entity';
import {
  ConfirmVerificationArgs,
  RequestVerificationArgs,
} from './dto/verification.args';
import { Verification } from './entities/verification.entity';

@Injectable()
export class VerificationsService {
  constructor(
    @InjectRepository(Verification) private repo: Repository<Verification>,
    private mailer: MailerService,
  ) {}

  async request(
    {}: RequestVerificationArgs,
    user: User,
  ): Promise<Verification> {
    const existing = await this.findExisting(user);
    if (existing) throw new BadRequestException('Pending verification exists');
    const verification = this.repo.create({
      user,
      code: this.generateCode(),
      verified: false,
      remainingAttemptCount: 3,
      expiresAt: this.getExpirationDate().toDate(),
    });
    await this.sendEmail(verification);
    return verification;
  }

  async confirm(
    { code }: ConfirmVerificationArgs,
    user: User,
  ): Promise<Verification> {
    const verification = await this.findExisting(user);
    if (!verification) throw new BadRequestException('No pending verification');
    const isCorrect = code == verification.code;
    if (isCorrect) verification.verified = true;
    return verification;
  }

  private async findExisting(user: User): Promise<Verification | null> {
    return this.repo.findOne({
      user,
      verified: false,
      remainingAttemptCount: { $gt: 0 },
      expiresAt: { $gt: dayjs().toDate() },
    });
  }

  private async sendEmail(verification: Verification): Promise<void> {
    const { code, user } = verification;
    const message = {
      to: user.email,
      subject: 'Tasked',
      text: `Your verification code is ${code}`,
    };
    await this.mailer.sendMail(message);
  }

  private generateCode(): string {
    return '' + faker.datatype.number({ min: 100000, max: 999999 });
  }

  private getExpirationDate(from = dayjs()): Dayjs {
    return from.add(3, 'hours');
  }
}
