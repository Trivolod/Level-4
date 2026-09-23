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
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PeopleService } from './people.service';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'Таблиця людей: найновіші першими, за замовчуванням 10 на сторінку' })
  @ApiDataResponse(Person, { isArray: true, paginated: true })
  findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<Person>> {
    return this.peopleService.findAll(query);
  }

  @Get(':id')
  @ApiDataResponse(Person)
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.peopleService.findOne(id);
  }

  @Post()
  @ApiDataResponse(Person, { created: true })
  create(@Body() dto: CreatePersonDto): Promise<Person> {
    return this.peopleService.create(dto);
  }

  @Patch(':id')
  @ApiDataResponse(Person)
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePersonDto): Promise<Person> {
    return this.peopleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.peopleService.remove(id);
  }
}
