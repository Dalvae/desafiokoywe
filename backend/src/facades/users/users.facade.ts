import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/users/users.service';
import { RegisterDto } from '../../modules/auth/dto/auth.dto';

@Injectable()
export class UsersFacade {
  constructor(private readonly userService: UserService) {}

  async createUser(registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }
}
