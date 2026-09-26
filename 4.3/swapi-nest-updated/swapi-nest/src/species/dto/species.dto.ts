import { PartialType } from '@nestjs/swagger';
import { IdField, NumericTextField, TextField } from '../../common/decorators/fields.decorators';

export class CreateSpeciesDto {
  @TextField('Human')
  name: string;
  @TextField('mammal')
  classification: string;
  @TextField('sentient')
  designation: string;
  @NumericTextField('180')
  average_height: string;
  @TextField('caucasian, black, asian, hispanic')
  skin_colors: string;
  @TextField('blonde, brown, black, red')
  hair_colors: string;
  @TextField('brown, blue, green, hazel, grey, amber')
  eye_colors: string;
  @NumericTextField('120')
  average_lifespan: string;
  @TextField('Galactic Basic')
  language: string;
  @IdField()
  homeworld_id?: number | null;
}

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}
