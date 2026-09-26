import { PartialType } from '@nestjs/swagger';
import { TextField } from '../../common/decorators/fields.decorators';

export class CreateGenderDto {
  @TextField('male', 64)
  name: string;
}

export class UpdateGenderDto extends PartialType(CreateGenderDto) {}
