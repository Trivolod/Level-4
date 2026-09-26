import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsRepository extends Repository<Film> {
  constructor(dataSource: DataSource) {
    super(Film, dataSource.createEntityManager());
  }
}
