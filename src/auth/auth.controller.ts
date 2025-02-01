import { Body, Controller, Post, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateUserAuthDto, LoginDto } from './auth.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, OmitType } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: CreateUserAuthDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiConflictResponse({
    description: 'Conflict: User already exists.'
  })
  create(
    @Body(new ValidationPipe({ transform: true })) createAuthDto: CreateAuthDto,
  ) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
