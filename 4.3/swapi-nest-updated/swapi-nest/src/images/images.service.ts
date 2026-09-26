import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { In } from 'typeorm';
import { Person } from '../people/entities/person.entity';
import { PersonImage } from './entities/person-image.entity';
import { AllowedMime, detectImageMime } from './image-types';
import { ImagesRepository } from './images.repository';
import { S3Service } from './s3.service';

const encodeRfc5987 = (value: string): string =>
  encodeURIComponent(value).replace(/['()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);

@Injectable()
export class ImagesService {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly s3Service: S3Service,
  ) {}

  async findByPerson(personId: number): Promise<PersonImage[]> {
    await this.assertPersonExists(personId);
    return this.imagesRepository.findByPerson(personId);
  }

  async upload(personId: number, files: Express.Multer.File[] = []): Promise<PersonImage[]> {
    await this.assertPersonExists(personId);
    if (files.length === 0) {
      throw new BadRequestException('Attach at least one image in the "files" field');
    }

    const valid: { file: Express.Multer.File; mime: AllowedMime; key: string }[] = [];
    const invalid: string[] = [];
    for (const file of files) {
      const mime = detectImageMime(file.buffer);
      if (mime) {
        valid.push({ file, mime, key: `people/${personId}/${randomUUID()}` });
      } else {
        invalid.push(file.originalname);
      }
    }
    if (invalid.length > 0) {
      throw new UnsupportedMediaTypeException(`Not a valid jpeg/png/gif/webp image: ${invalid.join(', ')}`);
    }

    try {
      await Promise.all(valid.map(({ file, mime, key }) => this.s3Service.upload(key, file.buffer, mime)));
    } catch (error) {
      await this.s3Service.deleteMany(valid.map(({ key }) => key));
      throw error;
    }

    try {
      const saved = await this.imagesRepository.save(
        valid.map(({ file, mime, key }) =>
          this.imagesRepository.create({
            personId,
            token: randomUUID(),
            originalName: file.originalname.slice(0, 255),
            mimeType: mime,
            size: file.size,
            storedName: key,
          }),
        ),
      );
      return this.imagesRepository.find({ where: { id: In(saved.map((image) => image.id)) }, order: { id: 'ASC' } });
    } catch (error) {
      await this.s3Service.deleteMany(valid.map(({ key }) => key));
      throw error;
    }
  }

  async remove(personId: number, imageId: number): Promise<void> {
    const image = await this.imagesRepository.findFileById(personId, imageId);
    if (!image) {
      throw new NotFoundException(`Image #${imageId} of person #${personId} not found`);
    }
    await this.imagesRepository.delete(image.id);
    await this.s3Service.deleteMany([image.storedName]);
  }

  async openByToken(token: string): Promise<StreamableFile> {
    const image = await this.imagesRepository.findFileByToken(token);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const object = await this.s3Service.getObject(image.storedName);
    return new StreamableFile(object.stream, {
      type: object.contentType ?? image.mimeType,
      length: object.contentLength,
      disposition: `inline; filename*=UTF-8''${encodeRfc5987(image.originalName)}`,
    });
  }

  findStoredNames(personId: number): Promise<string[]> {
    return this.imagesRepository.findStoredNames(personId);
  }

  deleteFiles(storedNames: string[]): Promise<void> {
    return this.s3Service.deleteMany(storedNames);
  }

  private async assertPersonExists(personId: number): Promise<void> {
    const exists = await this.imagesRepository.manager.exists(Person, { where: { id: personId } });
    if (!exists) {
      throw new NotFoundException(`Person #${personId} not found`);
    }
  }
}
