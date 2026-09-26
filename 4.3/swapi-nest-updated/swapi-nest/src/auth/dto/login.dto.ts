import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'luke@rebellion.io' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'useTheForce123' })
  @IsString()
  password: string;
}
