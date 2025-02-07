import { Injectable } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterDto } from '../../models/dtos/auth.dto';

@Injectable()
export class UsersFacade {
  constructor(private readonly userService: UserService) {}

  async createUser(registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }
}
