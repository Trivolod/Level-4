import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService extends BaseCrudService<Vehicle> {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {
    super(vehiclesRepository, 'Vehicle');
  }

  create(dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesRepository.save(this.vehiclesRepository.create(dto));
  }

  async update(id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    return this.vehiclesRepository.save(Object.assign(vehicle, dto));
  }
}
