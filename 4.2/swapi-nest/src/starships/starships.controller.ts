import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDataResponse } from '../common/decorators/api-data-response.decorator';
import { PaginatedResult } from '../common/pagination/paginated-result';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { CreateStarshipDto, UpdateStarshipDto } from './dto/starship.dto';
import { Starship } from './entities/starship.entity';
import { StarshipsService } from './starships.service';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'List starships (latest first, paginated)' })
  @ApiDataResponse(Starship, { isArray: true, paginated: true })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Starship>> {
    return this.starshipsService.findAll(query);
  }

  @Get(':id')
  @ApiDataResponse(Starship)
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Starship> {
    return this.starshipsService.findOne(id);
  }

  @Post()
  @ApiDataResponse(Starship, { created: true })
  create(@Body() dto: CreateStarshipDto): Promise<Starship> {
    return this.starshipsService.create(dto);
  }

  @Patch(':id')
  @ApiDataResponse(Starship)
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStarshipDto): Promise<Starship> {
    return this.starshipsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.starshipsService.remove(id);
  }
}
