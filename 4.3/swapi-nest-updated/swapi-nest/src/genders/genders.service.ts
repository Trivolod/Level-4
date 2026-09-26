import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateGenderDto, UpdateGenderDto } from './dto/gender.dto';
import { Gender } from './entities/gender.entity';
import { GendersRepository } from './genders.repository';

@Injectable()
export class GendersService extends BaseCrudService<Gender> {
  constructor(private readonly gendersRepository: GendersRepository) {
    super(gendersRepository, 'Gender');
  }

  create(dto: CreateGenderDto): Promise<Gender> {
    return this.gendersRepository.save(this.gendersRepository.create(dto));
  }

  async update(id: number, dto: UpdateGenderDto): Promise<Gender> {
    const gender = await this.findOne(id);
    return this.gendersRepository.save(Object.assign(gender, dto));
  }
}
