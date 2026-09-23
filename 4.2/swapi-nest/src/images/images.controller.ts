import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiDataResponse } from '../common/decorators/api-data-response.decorator';
import { PersonImage } from './entities/person-image.entity';
import { imageUploadOptions } from './image-upload.options';
import { ImagesService } from './images.service';

@ApiTags('people images')
@Controller('people/:personId/images')
export class PersonImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Завантажити будь-яку кількість картинок (jpeg/png/gif/webp, до 5 МБ кожна)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } },
    },
  })
  @ApiDataResponse(PersonImage, { isArray: true, created: true })
  @ApiNotFoundResponse()
  @UseInterceptors(FilesInterceptor('files', undefined, imageUploadOptions)) // maxCount не задано -> без ліміту
  upload(
    @Param('personId', ParseIntPipe) personId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<PersonImage[]> {
    return this.imagesService.upload(personId, files);
  }

  @Get()
  @ApiOperation({ summary: 'Список картинок людини (з посиланнями url)' })
  @ApiDataResponse(PersonImage, { isArray: true })
  @ApiNotFoundResponse()
  findAll(@Param('personId', ParseIntPipe) personId: number): Promise<PersonImage[]> {
    return this.imagesService.findByPerson(personId);
  }

  @Delete(':imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити картинку (запис у БД і файл на диску)' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(
    @Param('personId', ParseIntPipe) personId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ): Promise<void> {
    return this.imagesService.remove(personId, imageId);
  }
}

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':token')
  @Header('X-Content-Type-Options', 'nosniff')
  @Header('Cache-Control', 'private, max-age=3600')
  @ApiOperation({ summary: 'Переглянути картинку за посиланням (url із відповіді API)' })
  @ApiOkResponse({
    description: 'Бінарний вміст картинки',
    content: { 'image/*': { schema: { type: 'string', format: 'binary' } } },
  })
  @ApiNotFoundResponse()
  getFile(@Param('token', ParseUUIDPipe) token: string): Promise<StreamableFile> {
    return this.imagesService.openByToken(token);
  }
}
