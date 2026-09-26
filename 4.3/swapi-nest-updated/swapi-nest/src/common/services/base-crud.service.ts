import { NotFoundException } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginatedResult, paginate } from '../pagination/paginated-result';
import { PaginationQueryDto } from '../pagination/pagination-query.dto';

export abstract class BaseCrudService<T extends ObjectLiteral & { id: number }> {
  protected constructor(
    protected readonly repository: Repository<T>,
    private readonly label: string,
    private readonly relations: readonly string[] = [],
  ) {}

  async findAll({ page, limit }: PaginationQueryDto): Promise<PaginatedResult<T>> {
    const [items, total] = await this.query()
      .orderBy('entity.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return paginate(items, total, page, limit);
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.query().where('entity.id = :id', { id }).getOne();
    if (!entity) {
      throw new NotFoundException(`${this.label} #${id} not found`);
    }
    return entity;
  }

  async findManyByIds(ids: number[]): Promise<T[]> {
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length === 0) {
      return [];
    }
    const found = await this.repository
      .createQueryBuilder('entity')
      .where('entity.id IN (:...ids)', { ids: uniqueIds })
      .getMany();
    if (found.length !== uniqueIds.length) {
      const foundIds = new Set(found.map((entity) => entity.id));
      const missing = uniqueIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException(`${this.label} with ids [${missing.join(', ')}] not found`);
    }
    return found;
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  private query(): SelectQueryBuilder<T> {
    return this.relations.reduce(
      (query, relation) => query.leftJoinAndSelect(`entity.${relation}`, relation),
      this.repository.createQueryBuilder('entity'),
    );
  }
}
