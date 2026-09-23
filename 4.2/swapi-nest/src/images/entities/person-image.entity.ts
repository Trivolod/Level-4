import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Person } from '../../people/entities/person.entity';

@Entity('person_images')
export class PersonImage {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ format: 'uuid' })
  @Column({ type: 'uuid', unique: true })
  token: string;

  @ApiProperty({ example: 'luke.png' })
  @Column({ name: 'original_name', type: 'varchar', length: 255 })
  originalName: string;

  @ApiProperty({ example: 'image/png' })
  @Column({ name: 'mime_type', type: 'varchar', length: 64 })
  mimeType: string;

  @ApiProperty({ description: 'Розмір у байтах', example: 48213 })
  @Column({ type: 'int' })
  size: number;

  @Column({ name: 'stored_name', type: 'varchar', length: 255, select: false })
  storedName: string;

  @ApiProperty({ example: 1 })
  @Column({ name: 'person_id', type: 'int' })
  personId: number;

  @ApiProperty({ description: 'Посилання для перегляду картинки', example: '/images/6f1c2f0e-9a3b-4c7e-8d2a-0b5e7c1f3a44' })
  url: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @ApiHideProperty()
  @ManyToOne(() => Person, (person) => person.images, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: Relation<Person>;

  @AfterLoad()
  applyUrl(): void {
    this.url = `/images/${this.token}`;
  }
}
