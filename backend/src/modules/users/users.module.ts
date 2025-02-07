import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from '../../dal/prisma/prisma.service';
import { UsersFacade } from '../../facades/users/users.facade';

@Module({
  providers: [UserService, PrismaService, UsersFacade],
  exports: [UserService], // Export UserService so it can be used in AuthModule
})
export class UsersModule {}
