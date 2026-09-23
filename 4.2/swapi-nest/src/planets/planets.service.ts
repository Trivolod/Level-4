import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreatePlanetDto, UpdatePlanetDto } from './dto/planet.dto';
import { Planet } from './entities/planet.entity';
import { PlanetsRepository } from './planets.repository';

@Injectable()
export class PlanetsService extends BaseCrudService<Planet> {
  constructor(private readonly planetsRepository: PlanetsRepository) {
    super(planetsRepository, 'Planet');
  }

  create(dto: CreatePlanetDto): Promise<Planet> {
    return this.planetsRepository.save(this.planetsRepository.create(dto));
  }

  async update(id: number, dto: UpdatePlanetDto): Promise<Planet> {
    const planet = await this.findOne(id);
    return this.planetsRepository.save(Object.assign(planet, dto));
  }
}
