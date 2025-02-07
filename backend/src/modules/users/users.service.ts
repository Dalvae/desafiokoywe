import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../dal/prisma/prisma.service';
import { RegisterDto } from '../../models/dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      // Handle duplicate email errors
      throw error;
    }
  }
}
