import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsRepository extends Repository<Planet> {
  constructor(dataSource: DataSource) {
    super(Planet, dataSource.createEntityManager());
  }
}
