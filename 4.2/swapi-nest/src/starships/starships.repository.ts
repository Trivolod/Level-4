import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipsRepository extends Repository<Starship> {
  constructor(dataSource: DataSource) {
    super(Starship, dataSource.createEntityManager());
  }
}
