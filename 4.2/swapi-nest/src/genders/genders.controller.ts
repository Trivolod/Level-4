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
import { CreateGenderDto, UpdateGenderDto } from './dto/gender.dto';
import { Gender } from './entities/gender.entity';
import { GendersService } from './genders.service';

@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  @ApiOperation({ summary: 'List genders (latest first, paginated)' })
  @ApiDataResponse(Gender, { isArray: true, paginated: true })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Gender>> {
    return this.gendersService.findAll(query);
  }

  @Get(':id')
  @ApiDataResponse(Gender)
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Gender> {
    return this.gendersService.findOne(id);
  }

  @Post()
  @ApiDataResponse(Gender, { created: true })
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.gendersService.create(dto);
  }

  @Patch(':id')
  @ApiDataResponse(Gender)
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGenderDto): Promise<Gender> {
    return this.gendersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gendersService.remove(id);
  }
}
