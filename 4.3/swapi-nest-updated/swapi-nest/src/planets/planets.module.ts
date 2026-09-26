import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsRepository } from './planets.repository';
import { PlanetsService } from './planets.service';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsRepository, PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
