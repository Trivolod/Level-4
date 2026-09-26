import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'luke@rebellion.io' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'useTheForce123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
