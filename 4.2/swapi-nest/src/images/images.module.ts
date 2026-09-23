import { Module } from '@nestjs/common';
import { ImagesController, PersonImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
import { ImagesService } from './images.service';

@Module({
  controllers: [PersonImagesController, ImagesController],
  providers: [ImagesRepository, ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
