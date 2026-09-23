import { PartialType } from '@nestjs/swagger';
import { NumericTextField, TextField } from '../../common/decorators/fields.decorators';

export class CreatePlanetDto {
  @TextField('Tatooine')
  name: string;
  @NumericTextField('23')
  rotation_period: string;
  @NumericTextField('304')
  orbital_period: string;
  @NumericTextField('10465')
  diameter: string;
  @TextField('arid')
  climate: string;
  @TextField('1 standard')
  gravity: string;
  @TextField('desert')
  terrain: string;
  @NumericTextField('1')
  surface_water: string;
  @NumericTextField('200000')
  population: string;
}

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}
