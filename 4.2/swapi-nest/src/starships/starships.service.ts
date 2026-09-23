import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateStarshipDto, UpdateStarshipDto } from './dto/starship.dto';
import { Starship } from './entities/starship.entity';
import { StarshipsRepository } from './starships.repository';

@Injectable()
export class StarshipsService extends BaseCrudService<Starship> {
  constructor(private readonly starshipsRepository: StarshipsRepository) {
    super(starshipsRepository, 'Starship');
  }

  create(dto: CreateStarshipDto): Promise<Starship> {
    return this.starshipsRepository.save(this.starshipsRepository.create(dto));
  }

  async update(id: number, dto: UpdateStarshipDto): Promise<Starship> {
    const starship = await this.findOne(id);
    return this.starshipsRepository.save(Object.assign(starship, dto));
  }
}
