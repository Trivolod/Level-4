import { PartialType } from '@nestjs/swagger';
import { DateField, IntField, TextField } from '../../common/decorators/fields.decorators';

export class CreateFilmDto {
  @TextField('A New Hope')
  title: string;
  @IntField(4)
  episode_id: number;
  @TextField('It is a period of civil war. Rebel spaceships, striking from a hidden base...', 10000)
  opening_crawl: string;
  @TextField('George Lucas')
  director: string;
  @TextField('Gary Kurtz, Rick McCallum')
  producer: string;
  @DateField('1977-05-25')
  release_date: string;
}

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}
