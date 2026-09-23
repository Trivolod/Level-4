import { PageMetaDto } from './page-meta.dto';

export class PaginatedResult<T> {
  constructor(
    readonly items: T[],
    readonly meta: PageMetaDto,
  ) {}
}

export function paginate<T>(items: T[], total: number, page: number, limit: number): PaginatedResult<T> {
  return new PaginatedResult(items, { total, page, limit, totalPages: Math.ceil(total / limit) });
}
