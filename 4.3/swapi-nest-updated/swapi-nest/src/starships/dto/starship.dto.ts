import { PartialType } from '@nestjs/swagger';
import { NumericTextField, TextField } from '../../common/decorators/fields.decorators';

export class CreateStarshipDto {
  @TextField('Millennium Falcon')
  name: string;
  @TextField('YT-1300 light freighter')
  model: string;
  @TextField('Corellian Engineering Corporation')
  manufacturer: string;
  @NumericTextField('100000')
  cost_in_credits: string;
  @NumericTextField('34.37')
  length: string;
  @NumericTextField('1050')
  max_atmosphering_speed: string;
  @NumericTextField('4')
  crew: string;
  @NumericTextField('6')
  passengers: string;
  @NumericTextField('100000')
  cargo_capacity: string;
  @TextField('2 months')
  consumables: string;
  @NumericTextField('0.5')
  hyperdrive_rating: string;
  @NumericTextField('75')
  MGLT: string;
  @TextField('Light freighter')
  starship_class: string;
}

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}
