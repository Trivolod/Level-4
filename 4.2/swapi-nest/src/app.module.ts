import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { buildDataSourceOptions } from './database/typeorm.config';
import { FilmsModule } from './films/films.module';
import { GendersModule } from './genders/genders.module';
import { ImagesModule } from './images/images.module';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => ({
        ...buildDataSourceOptions(process.env),
        migrationsRun: true,
      }),
    }),
    GendersModule,
    PlanetsModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    ImagesModule,
    PeopleModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
