import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsRepository } from './films.repository';
import { FilmsService } from './films.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsRepository, FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
