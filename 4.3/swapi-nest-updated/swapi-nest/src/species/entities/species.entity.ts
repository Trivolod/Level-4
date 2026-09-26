import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';
import { Planet } from '../../planets/entities/planet.entity';

@Entity('species')
export class Species extends AbstractEntity {
  @ApiProperty({ example: 'Human' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @ApiProperty({ example: 'mammal' })
  @Column({ type: 'varchar', length: 255 })
  classification: string;
  @ApiProperty({ example: 'sentient' })
  @Column({ type: 'varchar', length: 255 })
  designation: string;
  @ApiProperty({ example: '180' })
  @Column({ type: 'varchar', length: 64 })
  average_height: string;
  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  @Column({ type: 'varchar', length: 255 })
  skin_colors: string;
  @ApiProperty({ example: 'blonde, brown, black, red' })
  @Column({ type: 'varchar', length: 255 })
  hair_colors: string;
  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @Column({ type: 'varchar', length: 255 })
  eye_colors: string;
  @ApiProperty({ example: '120' })
  @Column({ type: 'varchar', length: 64 })
  average_lifespan: string;
  @ApiProperty({ example: 'Galactic Basic' })
  @Column({ type: 'varchar', length: 255 })
  language: string;

  @ApiProperty({ type: () => Planet, nullable: true })
  @ManyToOne(() => Planet, (planet) => planet.species, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Relation<Planet> | null;

  @ApiHideProperty()
  @ManyToMany(() => Person, (person) => person.species)
  people: Relation<Person>[];
}
