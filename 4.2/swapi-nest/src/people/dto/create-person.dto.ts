import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { IdField, IdListField, NumericTextField, TextField } from '../../common/decorators/fields.decorators';

export class CreatePersonDto {
  @TextField('Luke Skywalker')
  name: string;

  @NumericTextField('172')
  height: string;

  @NumericTextField('77')
  mass: string;

  @TextField('blond', 128)
  hair_color: string;

  @TextField('fair', 128)
  skin_color: string;

  @TextField('blue', 128)
  eye_color: string;

  @ApiProperty({ example: '19BBY', description: 'Рік у форматі SWAPI: 19BBY / 5ABY / unknown' })
  @IsString()
  @Matches(/^(unknown|n\/a|\d+(\.\d+)?(BBY|ABY))$/, { message: 'birth_year must look like "19BBY", "41.9BBY", "5ABY" or "unknown"' })
  birth_year: string;

  @IdField()
  homeworld_id?: number | null;

  @IdField()
  gender_id?: number | null;

  @IdListField()
  film_ids?: number[];

  @IdListField()
  species_ids?: number[];

  @IdListField()
  vehicle_ids?: number[];

  @IdListField()
  starship_ids?: number[];
}

export type PersonRelationIds = Pick<
  CreatePersonDto,
  'homeworld_id' | 'gender_id' | 'film_ids' | 'species_ids' | 'vehicle_ids' | 'starship_ids'
>;
