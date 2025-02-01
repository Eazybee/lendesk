import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, registerDecorator } from 'class-validator';

function Password(property: string) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Password',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message:
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      },
      validator: {
        validate(password: string) {
          const isMinLength = password.length >= 8;
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[@#$%^&*!]/.test(password);

          return (
            isMinLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
          );
        },
      },
    });
  };
}

function Username(property: string) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'Username',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message:
          'Username must contain at least 4 characters, start with an alphabet, and not contain special characters',
      },
      validator: {
        validate(username: string) {
          const isMinLength = username.length >= 4;
          const startsWithAlpha = /^[A-Za-z]/.test(username);
          const doesNotContainSpecialChar = /^[A-Za-z0-9]+$/.test(username);

          return isMinLength && startsWithAlpha && doesNotContainSpecialChar;
        },
      },
    });
  };
}


export class CreateAuthDto {
  @ApiProperty({
    example: 'john',
    description: 'Username of the user, must be unique',
    required: true,
  })
  @IsNotEmpty()
  @Username('username')
  @Transform(({ value }: { value: string }) => value.toLowerCase(), {
    toClassOnly: true,
  })
  username: string;

  @ApiProperty({
    example: 'passWORD123@',
    description:
      'Password of the user, must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    required: true,
  })
  @IsNotEmpty()
  @Password('password')
  password: string;

  @ApiProperty({
    example: 'johndoe@test.com',
    description: 'Email of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateUserAuthDto {
  @ApiProperty({
    example: 201,
  })
  statusCode: number;


  @ApiProperty({
    example: 'Success',
  })
  message: 'Success';

  @ApiProperty({
    example: {
      username: 'john',
      email: 'johndoe@test.com'
    }
  })
  data: {
    username: string;
    email: string;
  };
}

export class LoginDto {
  @ApiProperty({
    example: 'john',
    description: 'Username of the user, must be unique',
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.toLowerCase(), {
    toClassOnly: true,
  })
  username: string;

  @ApiProperty({
    example: 'passWORD123@',
    description:
      'Password of the user, must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
