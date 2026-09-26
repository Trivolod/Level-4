import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesRepository extends Repository<Vehicle> {
  constructor(dataSource: DataSource) {
    super(Vehicle, dataSource.createEntityManager());
  }
}
