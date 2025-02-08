import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dal/prisma/prisma.service';
import { RegisterDto } from '../models/dtos/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(registerDto: RegisterDto): Promise<any> {
    const hashedPassword = await argon2.hash(registerDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
