import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UsersFacade } from '../../facades/users/users.facade'; // Import UsersFacade
import { Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(UsersFacade) private usersFacade: UsersFacade, // Inject UsersFacade
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Use UsersFacade to create the user
    await this.usersFacade.createUser(registerDto);
    return this.authService.login({ email: registerDto.email, password: registerDto.password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
