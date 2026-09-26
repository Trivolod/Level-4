import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersonImage } from './entities/person-image.entity';

@Injectable()
export class ImagesRepository extends Repository<PersonImage> {
  constructor(dataSource: DataSource) {
    super(PersonImage, dataSource.createEntityManager());
  }

  findByPerson(personId: number): Promise<PersonImage[]> {
    return this.find({ where: { personId }, order: { id: 'ASC' } });
  }

  /** stored_name за замовчуванням не вибирається (select: false), тому додаємо явно */
  findFileByToken(token: string): Promise<PersonImage | null> {
    return this.createQueryBuilder('image')
      .addSelect('image.storedName')
      .where('image.token = :token', { token })
      .getOne();
  }

  findFileById(personId: number, id: number): Promise<PersonImage | null> {
    return this.createQueryBuilder('image')
      .addSelect('image.storedName')
      .where('image.id = :id AND image.personId = :personId', { id, personId })
      .getOne();
  }

  async findStoredNames(personId: number): Promise<string[]> {
    const images = await this.createQueryBuilder('image')
      .addSelect('image.storedName')
      .where('image.personId = :personId', { personId })
      .getMany();
    return images.map((image) => image.storedName);
  }
}
