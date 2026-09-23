import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersRepository extends Repository<Gender> {
  constructor(dataSource: DataSource) {
    super(Gender, dataSource.createEntityManager());
  }
}
