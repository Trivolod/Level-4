import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty({ example: 57 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 6 })
  totalPages: number;
}
