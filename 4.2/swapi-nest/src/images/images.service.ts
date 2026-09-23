import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createReadStream } from 'fs';
import { rm, stat } from 'fs/promises';
import { basename, join } from 'path';
import { In } from 'typeorm';
import { Person } from '../people/entities/person.entity';
import { PersonImage } from './entities/person-image.entity';
import { AllowedMime, detectImageMime, getUploadsDir } from './image-types';
import { ImagesRepository } from './images.repository';

const encodeRfc5987 = (value: string): string =>
  encodeURIComponent(value).replace(/['()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async findByPerson(personId: number): Promise<PersonImage[]> {
    await this.assertPersonExists(personId);
    return this.imagesRepository.findByPerson(personId);
  }

  async upload(personId: number, files: Express.Multer.File[] = []): Promise<PersonImage[]> {
    try {
      await this.assertPersonExists(personId);
      if (files.length === 0) {
        throw new BadRequestException('Attach at least one image in the "files" field');
      }

      const valid: { file: Express.Multer.File; mime: AllowedMime }[] = [];
      const invalid: string[] = [];
      for (const file of files) {
        const mime = await detectImageMime(file.path);
        if (mime) {
          valid.push({ file, mime });
        } else {
          invalid.push(file.originalname);
        }
      }
      if (invalid.length > 0) {
        throw new UnsupportedMediaTypeException(`Not a valid jpeg/png/gif/webp image: ${invalid.join(', ')}`);
      }

      const saved = await this.imagesRepository.save(
        valid.map(({ file, mime }) =>
          this.imagesRepository.create({
            personId,
            token: randomUUID(),
            originalName: basename(file.originalname).slice(0, 255),
            mimeType: mime,
            size: file.size,
            storedName: file.filename,
          }),
        ),
      );
      return this.imagesRepository.find({ where: { id: In(saved.map((image) => image.id)) }, order: { id: 'ASC' } });
    } catch (error) {
      await this.deleteFiles(files.map((file) => file.filename));
      throw error;
    }
  }

  async remove(personId: number, imageId: number): Promise<void> {
    const image = await this.imagesRepository.findFileById(personId, imageId);
    if (!image) {
      throw new NotFoundException(`Image #${imageId} of person #${personId} not found`);
    }
    await this.imagesRepository.delete(image.id);
    await this.deleteFiles([image.storedName]);
  }

  async openByToken(token: string): Promise<StreamableFile> {
    const image = await this.imagesRepository.findFileByToken(token);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const path = this.pathOf(image.storedName);
    const size = await stat(path).then(
      (info) => info.size,
      () => null,
    );
    if (size === null) {
      throw new NotFoundException('Image file is missing');
    }
    return new StreamableFile(createReadStream(path), {
      type: image.mimeType,
      length: size,
      disposition: `inline; filename*=UTF-8''${encodeRfc5987(image.originalName)}`,
    });
  }

  findStoredNames(personId: number): Promise<string[]> {
    return this.imagesRepository.findStoredNames(personId);
  }

  async deleteFiles(storedNames: string[]): Promise<void> {
    await Promise.all(storedNames.map((name) => rm(this.pathOf(name), { force: true })));
  }

  private pathOf(storedName: string): string {
    return join(getUploadsDir(), basename(storedName));
  }

  private async assertPersonExists(personId: number): Promise<void> {
    const exists = await this.imagesRepository.manager.exists(Person, { where: { id: personId } });
    if (!exists) {
      throw new NotFoundException(`Person #${personId} not found`);
    }
  }
}
