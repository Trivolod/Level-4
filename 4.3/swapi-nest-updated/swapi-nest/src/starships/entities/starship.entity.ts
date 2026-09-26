import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';

@Entity('starships')
export class Starship extends AbstractEntity {
  @ApiProperty({ example: 'Millennium Falcon' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @ApiProperty({ example: 'YT-1300 light freighter' })
  @Column({ type: 'varchar', length: 255 })
  model: string;
  @ApiProperty({ example: 'Corellian Engineering Corporation' })
  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;
  @ApiProperty({ example: '100000' })
  @Column({ type: 'varchar', length: 64 })
  cost_in_credits: string;
  @ApiProperty({ example: '34.37' })
  @Column({ type: 'varchar', length: 64 })
  length: string;
  @ApiProperty({ example: '1050' })
  @Column({ type: 'varchar', length: 64 })
  max_atmosphering_speed: string;
  @ApiProperty({ example: '4' })
  @Column({ type: 'varchar', length: 64 })
  crew: string;
  @ApiProperty({ example: '6' })
  @Column({ type: 'varchar', length: 64 })
  passengers: string;
  @ApiProperty({ example: '100000' })
  @Column({ type: 'varchar', length: 64 })
  cargo_capacity: string;
  @ApiProperty({ example: '2 months' })
  @Column({ type: 'varchar', length: 255 })
  consumables: string;
  @ApiProperty({ example: '0.5' })
  @Column({ type: 'varchar', length: 64 })
  hyperdrive_rating: string;
  @ApiProperty({ example: '75' })
  @Column({ type: 'varchar', length: 64 })
  MGLT: string;
  @ApiProperty({ example: 'Light freighter' })
  @Column({ type: 'varchar', length: 255 })
  starship_class: string;

  @ApiHideProperty()
  @ManyToMany(() => Person, (person) => person.starships)
  pilots: Relation<Person>[];
}
