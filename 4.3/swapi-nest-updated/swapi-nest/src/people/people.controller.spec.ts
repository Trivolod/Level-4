import { Test } from '@nestjs/testing';
import { PaginatedResult } from '../common/pagination/paginated-result';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

type PeopleServiceMock = jest.Mocked<Pick<PeopleService, 'findAll' | 'findOne' | 'create' | 'update' | 'remove'>>;

describe('PeopleController', () => {
  let controller: PeopleController;
  const service: PeopleServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const person = Object.assign(new Person(), { id: 1, name: 'Luke Skywalker' });

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleService, useValue: service }],
    }).compile();
    controller = moduleRef.get(PeopleController);
  });

  it('GET /people -> service.findAll(query)', async () => {
    const query = new PaginationQueryDto();
    const result = new PaginatedResult([person], { total: 1, page: 1, limit: 10, totalPages: 1 });
    service.findAll.mockResolvedValue(result);

    await expect(controller.findAll(query)).resolves.toBe(result);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('GET /people/:id -> service.findOne(id)', async () => {
    service.findOne.mockResolvedValue(person);

    await expect(controller.findOne(1)).resolves.toBe(person);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('POST /people -> service.create(dto)', async () => {
    const dto = new CreatePersonDto();
    service.create.mockResolvedValue(person);

    await expect(controller.create(dto)).resolves.toBe(person);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('PATCH /people/:id -> service.update(id, dto)', async () => {
    const dto = new UpdatePersonDto();
    service.update.mockResolvedValue(person);

    await expect(controller.update(1, dto)).resolves.toBe(person);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('DELETE /people/:id -> service.remove(id)', async () => {
    service.remove.mockResolvedValue(undefined);

    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
