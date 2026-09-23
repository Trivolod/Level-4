import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../pagination/paginated-result';

@Injectable()
export class ResponseInterceptor implements NestInterceptor<unknown, unknown> {
  intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      map((value: unknown) => {
        if (value === undefined || value instanceof StreamableFile) {
          return value;
        }
        if (value instanceof PaginatedResult) {
          return { data: value.items, meta: value.meta };
        }
        return { data: value };
      }),
    );
  }
}
