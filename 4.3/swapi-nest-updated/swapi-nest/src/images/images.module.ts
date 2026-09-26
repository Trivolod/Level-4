import { Module } from '@nestjs/common';
import { ImagesController, PersonImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
import { ImagesService } from './images.service';
import { S3Service } from './s3.service';

@Module({
  controllers: [PersonImagesController, ImagesController],
  providers: [ImagesRepository, ImagesService, S3Service],
  exports: [ImagesService],
})
export class ImagesModule {}
