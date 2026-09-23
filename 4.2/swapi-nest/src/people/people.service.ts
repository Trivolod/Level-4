import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { GendersService } from '../genders/genders.service';
import { ImagesService } from '../images/images.service';
import { PaginatedResult, paginate } from '../common/pagination/paginated-result';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { PlanetsService } from '../planets/planets.service';
import { SpeciesService } from '../species/species.service';
import { StarshipsService } from '../starships/starships.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { CreatePersonDto, PersonRelationIds } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly planetsService: PlanetsService,
    private readonly gendersService: GendersService,
    private readonly filmsService: FilmsService,
    private readonly speciesService: SpeciesService,
    private readonly vehiclesService: VehiclesService,
    private readonly starshipsService: StarshipsService,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll({ page, limit }: PaginationQueryDto): Promise<PaginatedResult<Person>> {
    const [items, total] = await this.peopleRepository.findPage((page - 1) * limit, limit);
    return paginate(items, total, page, limit);
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.peopleRepository.findOneWithImages(id);
    if (!person) {
      throw new NotFoundException(`Person #${id} not found`);
    }
    return person;
  }

  async create(dto: CreatePersonDto): Promise<Person> {
    const { homeworld_id, gender_id, film_ids, species_ids, vehicle_ids, starship_ids, ...fields } = dto;
    const person = this.peopleRepository.create(fields);
    await this.applyRelations(person, { homeworld_id, gender_id, film_ids, species_ids, vehicle_ids, starship_ids });
    const saved = await this.peopleRepository.save(person);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdatePersonDto): Promise<Person> {
    const { homeworld_id, gender_id, film_ids, species_ids, vehicle_ids, starship_ids, ...fields } = dto;
    const person = await this.peopleRepository.findOneForUpdate(id);
    if (!person) {
      throw new NotFoundException(`Person #${id} not found`);
    }
    Object.assign(person, fields);
    await this.applyRelations(person, { homeworld_id, gender_id, film_ids, species_ids, vehicle_ids, starship_ids });
    await this.peopleRepository.save(person);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const storedNames = await this.imagesService.findStoredNames(id);
    const { affected } = await this.peopleRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Person #${id} not found`);
    }
    await this.imagesService.deleteFiles(storedNames);
  }

  private async applyRelations(person: Person, ids: PersonRelationIds): Promise<void> {
    if (ids.homeworld_id !== undefined) {
      person.homeworld = ids.homeworld_id === null ? null : await this.planetsService.findOne(ids.homeworld_id);
    }
    if (ids.gender_id !== undefined) {
      person.gender = ids.gender_id === null ? null : await this.gendersService.findOne(ids.gender_id);
    }
    if (ids.film_ids) {
      person.films = await this.filmsService.findManyByIds(ids.film_ids);
    }
    if (ids.species_ids) {
      person.species = await this.speciesService.findManyByIds(ids.species_ids);
    }
    if (ids.vehicle_ids) {
      person.vehicles = await this.vehiclesService.findManyByIds(ids.vehicle_ids);
    }
    if (ids.starship_ids) {
      person.starships = await this.starshipsService.findManyByIds(ids.starship_ids);
    }
  }
}
