import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user-role.enum';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'luke@rebellion.io' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;
}
