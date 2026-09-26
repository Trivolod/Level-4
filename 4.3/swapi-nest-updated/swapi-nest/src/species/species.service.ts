import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { PlanetsService } from '../planets/planets.service';
import { CreateSpeciesDto, UpdateSpeciesDto } from './dto/species.dto';
import { Species } from './entities/species.entity';
import { SpeciesRepository } from './species.repository';

@Injectable()
export class SpeciesService extends BaseCrudService<Species> {
  constructor(
    private readonly speciesRepository: SpeciesRepository,
    private readonly planetsService: PlanetsService,
  ) {
    super(speciesRepository, 'Species', ['homeworld']);
  }

  async create(dto: CreateSpeciesDto): Promise<Species> {
    const { homeworld_id, ...fields } = dto;
    const species = this.speciesRepository.create(fields);
    if (homeworld_id !== undefined) {
      species.homeworld = homeworld_id === null ? null : await this.planetsService.findOne(homeworld_id);
    }
    const saved = await this.speciesRepository.save(species);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateSpeciesDto): Promise<Species> {
    const { homeworld_id, ...fields } = dto;
    const species = await this.findOne(id);
    Object.assign(species, fields);
    if (homeworld_id !== undefined) {
      species.homeworld = homeworld_id === null ? null : await this.planetsService.findOne(homeworld_id);
    }
    await this.speciesRepository.save(species);
    return this.findOne(id);
  }
}
