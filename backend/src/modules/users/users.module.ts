import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from '../../dal/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService], // Export UserService so it can be used in AuthModule
})
export class UsersModule {}
