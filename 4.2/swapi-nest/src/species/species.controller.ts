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
import { CreateSpeciesDto, UpdateSpeciesDto } from './dto/species.dto';
import { Species } from './entities/species.entity';
import { SpeciesService } from './species.service';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  @ApiOperation({ summary: 'List species (latest first, paginated)' })
  @ApiDataResponse(Species, { isArray: true, paginated: true })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Species>> {
    return this.speciesService.findAll(query);
  }

  @Get(':id')
  @ApiDataResponse(Species)
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Species> {
    return this.speciesService.findOne(id);
  }

  @Post()
  @ApiDataResponse(Species, { created: true })
  create(@Body() dto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(dto);
  }

  @Patch(':id')
  @ApiDataResponse(Species)
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSpeciesDto): Promise<Species> {
    return this.speciesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.speciesService.remove(id);
  }
}
