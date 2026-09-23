import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesRepository extends Repository<Species> {
  constructor(dataSource: DataSource) {
    super(Species, dataSource.createEntityManager());
  }
}
