import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Film } from '../../films/entities/film.entity';
import { Gender } from '../../genders/entities/gender.entity';
import { PersonImage } from '../../images/entities/person-image.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

const joinTable = (name: string, inverseColumn: string) => ({
  name,
  joinColumn: { name: 'person_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: inverseColumn, referencedColumnName: 'id' },
});

@Entity('people')
export class Person extends AbstractEntity {
  @ApiProperty({ example: 'Luke Skywalker' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: '172' })
  @Column({ type: 'varchar', length: 64 })
  height: string;

  @ApiProperty({ example: '77' })
  @Column({ type: 'varchar', length: 64 })
  mass: string;

  @ApiProperty({ example: 'blond' })
  @Column({ type: 'varchar', length: 128 })
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  @Column({ type: 'varchar', length: 128 })
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  @Column({ type: 'varchar', length: 128 })
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  @Column({ type: 'varchar', length: 32 })
  birth_year: string;

  @ApiProperty({ type: () => Gender, nullable: true })
  @ManyToOne(() => Gender, (gender) => gender.people, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'gender_id' })
  gender: Relation<Gender> | null;

  @ApiProperty({ type: () => Planet, nullable: true })
  @ManyToOne(() => Planet, (planet) => planet.residents, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Relation<Planet> | null;

  @ApiProperty({ type: () => [Film] })
  @ManyToMany(() => Film, (film) => film.characters)
  @JoinTable(joinTable('people_films', 'film_id'))
  films: Relation<Film>[];

  @ApiProperty({ type: () => [Species] })
  @ManyToMany(() => Species, (species) => species.people)
  @JoinTable(joinTable('people_species', 'species_id'))
  species: Relation<Species>[];

  @ApiProperty({ type: () => [Vehicle] })
  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  @JoinTable(joinTable('people_vehicles', 'vehicle_id'))
  vehicles: Relation<Vehicle>[];

  @ApiProperty({ type: () => [Starship] })
  @ManyToMany(() => Starship, (starship) => starship.pilots)
  @JoinTable(joinTable('people_starships', 'starship_id'))
  starships: Relation<Starship>[];

  @ApiProperty({ type: () => [PersonImage] })
  @OneToMany(() => PersonImage, (image) => image.person)
  images: Relation<PersonImage>[];
}
