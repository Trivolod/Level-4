import { Module } from '@nestjs/common';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesController } from './species.controller';
import { SpeciesRepository } from './species.repository';
import { SpeciesService } from './species.service';

@Module({
  imports: [PlanetsModule],
  controllers: [SpeciesController],
  providers: [SpeciesRepository, SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
