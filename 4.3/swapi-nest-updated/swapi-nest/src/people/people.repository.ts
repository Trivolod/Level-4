import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { Person } from './entities/person.entity';

const BASE_RELATIONS = {
  homeworld: true,
  gender: true,
  films: true,
  species: true,
  vehicles: true,
  starships: true,
} satisfies FindOptionsRelations<Person>;

@Injectable()
export class PeopleRepository extends Repository<Person> {
  constructor(dataSource: DataSource) {
    super(Person, dataSource.createEntityManager());
  }

  /** Найновіші першими */
  findPage(skip: number, take: number): Promise<[Person[], number]> {
    return this.findAndCount({
      relations: { ...BASE_RELATIONS, images: true },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  findOneWithImages(id: number): Promise<Person | null> {
    return this.findOne({ where: { id }, relations: { ...BASE_RELATIONS, images: true } });
  }

  findOneForUpdate(id: number): Promise<Person | null> {
    return this.findOne({ where: { id }, relations: BASE_RELATIONS });
  }
}
