import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, LoginDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const userObject = { ...createAuthDto };
    const isUserExist = await this.userService.findOne(userObject.username);

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userService.create(createAuthDto as any);

    return user;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string } | undefined> {
    const user = (await this.userService.findOne(loginDto.username)) as Omit<
      User,
      'password'
    >;

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    delete user.password;

    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
}
