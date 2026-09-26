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
import { CreatePlanetDto, UpdatePlanetDto } from './dto/planet.dto';
import { Planet } from './entities/planet.entity';
import { PlanetsService } from './planets.service';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiOperation({ summary: 'List planets (latest first, paginated)' })
  @ApiDataResponse(Planet, { isArray: true, paginated: true })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Planet>> {
    return this.planetsService.findAll(query);
  }

  @Get(':id')
  @ApiDataResponse(Planet)
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    return this.planetsService.findOne(id);
  }

  @Post()
  @ApiDataResponse(Planet, { created: true })
  create(@Body() dto: CreatePlanetDto): Promise<Planet> {
    return this.planetsService.create(dto);
  }

  @Patch(':id')
  @ApiDataResponse(Planet)
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlanetDto): Promise<Planet> {
    return this.planetsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.planetsService.remove(id);
  }
}
