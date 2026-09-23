import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  edited: Date;
}
