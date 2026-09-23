import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateFilmDto, UpdateFilmDto } from './dto/film.dto';
import { Film } from './entities/film.entity';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService extends BaseCrudService<Film> {
  constructor(private readonly filmsRepository: FilmsRepository) {
    super(filmsRepository, 'Film');
  }

  create(dto: CreateFilmDto): Promise<Film> {
    return this.filmsRepository.save(this.filmsRepository.create(dto));
  }

  async update(id: number, dto: UpdateFilmDto): Promise<Film> {
    const film = await this.findOne(id);
    return this.filmsRepository.save(Object.assign(film, dto));
  }
}
