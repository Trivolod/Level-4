import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';
import { Species } from '../../species/entities/species.entity';

@Entity('planets')
export class Planet extends AbstractEntity {
  @ApiProperty({ example: 'Tatooine' })
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @ApiProperty({ example: '23' })
  @Column({ type: 'varchar', length: 64 })
  rotation_period: string;
  @ApiProperty({ example: '304' })
  @Column({ type: 'varchar', length: 64 })
  orbital_period: string;
  @ApiProperty({ example: '10465' })
  @Column({ type: 'varchar', length: 64 })
  diameter: string;
  @ApiProperty({ example: 'arid' })
  @Column({ type: 'varchar', length: 255 })
  climate: string;
  @ApiProperty({ example: '1 standard' })
  @Column({ type: 'varchar', length: 255 })
  gravity: string;
  @ApiProperty({ example: 'desert' })
  @Column({ type: 'varchar', length: 255 })
  terrain: string;
  @ApiProperty({ example: '1' })
  @Column({ type: 'varchar', length: 64 })
  surface_water: string;
  @ApiProperty({ example: '200000' })
  @Column({ type: 'varchar', length: 64 })
  population: string;

  @ApiHideProperty()
  @OneToMany(() => Person, (person) => person.homeworld)
  residents: Relation<Person>[];

  @ApiHideProperty()
  @OneToMany(() => Species, (species) => species.homeworld)
  species: Relation<Species>[];
}
