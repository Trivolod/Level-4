import { Module } from '@nestjs/common';
import { GendersController } from './genders.controller';
import { GendersRepository } from './genders.repository';
import { GendersService } from './genders.service';

@Module({
  controllers: [GendersController],
  providers: [GendersRepository, GendersService],
  exports: [GendersService],
})
export class GendersModule {}
