import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsRepository } from './starships.repository';
import { StarshipsService } from './starships.service';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsRepository, StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {}
