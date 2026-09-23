import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Person } from '../../people/entities/person.entity';

@Entity('films')
export class Film extends AbstractEntity {
  @ApiProperty({ example: 'A New Hope' })
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @ApiProperty({ example: 4 })
  @Column({ type: 'int' })
  episode_id: number;
  @ApiProperty({ example: 'It is a period of civil war. Rebel spaceships, striking from a hidden base...' })
  @Column({ type: 'text' })
  opening_crawl: string;
  @ApiProperty({ example: 'George Lucas' })
  @Column({ type: 'varchar', length: 255 })
  director: string;
  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @Column({ type: 'varchar', length: 255 })
  producer: string;
  @ApiProperty({ example: '1977-05-25' })
  @Column({ type: 'date' })
  release_date: string;

  @ApiHideProperty()
  @ManyToMany(() => Person, (person) => person.films)
  characters: Relation<Person>[];
}
