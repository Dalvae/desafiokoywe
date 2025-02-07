import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from '../../dal/prisma/prisma.service';
import { UsersFacade } from './users.facade';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, PrismaService, UsersFacade, AuthService, JwtStrategy],
  exports: [UsersFacade, AuthService],
})
export class UsersModule {}
