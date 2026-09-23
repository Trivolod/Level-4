import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';

@Entity('genders')
export class Gender extends AbstractEntity {
  @ApiProperty({ example: 'male' })
  @Column({ type: 'varchar', length: 64, unique: true })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => Person, (person) => person.gender)
  people: Relation<Person>[];
}
