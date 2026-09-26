import { PartialType } from '@nestjs/swagger';
import { NumericTextField, TextField } from '../../common/decorators/fields.decorators';

export class CreateVehicleDto {
  @TextField('Sand Crawler')
  name: string;
  @TextField('Digger Crawler')
  model: string;
  @TextField('Corellia Mining Corporation')
  manufacturer: string;
  @NumericTextField('150000')
  cost_in_credits: string;
  @NumericTextField('36.8')
  length: string;
  @NumericTextField('30')
  max_atmosphering_speed: string;
  @NumericTextField('46')
  crew: string;
  @NumericTextField('30')
  passengers: string;
  @NumericTextField('50000')
  cargo_capacity: string;
  @TextField('2 months')
  consumables: string;
  @TextField('wheeled')
  vehicle_class: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
