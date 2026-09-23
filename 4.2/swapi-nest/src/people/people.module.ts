import { Module } from '@nestjs/common';
import { FilmsModule } from '../films/films.module';
import { GendersModule } from '../genders/genders.module';
import { ImagesModule } from '../images/images.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { PeopleController } from './people.controller';
import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';

@Module({
  imports: [
    ImagesModule,
    PlanetsModule,
    GendersModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
  ],
  controllers: [PeopleController],
  providers: [PeopleRepository, PeopleService],
})
export class PeopleModule {}
