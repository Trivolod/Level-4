import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';

@Entity('vehicles')
export class Vehicle extends AbstractEntity {
  @ApiProperty({ example: 'Sand Crawler' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @ApiProperty({ example: 'Digger Crawler' })
  @Column({ type: 'varchar', length: 255 })
  model: string;
  @ApiProperty({ example: 'Corellia Mining Corporation' })
  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;
  @ApiProperty({ example: '150000' })
  @Column({ type: 'varchar', length: 64 })
  cost_in_credits: string;
  @ApiProperty({ example: '36.8' })
  @Column({ type: 'varchar', length: 64 })
  length: string;
  @ApiProperty({ example: '30' })
  @Column({ type: 'varchar', length: 64 })
  max_atmosphering_speed: string;
  @ApiProperty({ example: '46' })
  @Column({ type: 'varchar', length: 64 })
  crew: string;
  @ApiProperty({ example: '30' })
  @Column({ type: 'varchar', length: 64 })
  passengers: string;
  @ApiProperty({ example: '50000' })
  @Column({ type: 'varchar', length: 64 })
  cargo_capacity: string;
  @ApiProperty({ example: '2 months' })
  @Column({ type: 'varchar', length: 255 })
  consumables: string;
  @ApiProperty({ example: 'wheeled' })
  @Column({ type: 'varchar', length: 255 })
  vehicle_class: string;

  @ApiHideProperty()
  @ManyToMany(() => Person, (person) => person.vehicles)
  pilots: Relation<Person>[];
}
