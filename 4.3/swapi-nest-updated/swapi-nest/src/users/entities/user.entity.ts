import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User extends AbstractEntity {
  @ApiProperty({ example: 'luke@rebellion.io' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiHideProperty()
  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
