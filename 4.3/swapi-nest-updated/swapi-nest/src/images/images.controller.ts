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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user-role.enum';
import { ApiDataResponse } from '../common/decorators/api-data-response.decorator';
import { PersonImage } from './entities/person-image.entity';
import { imageUploadOptions } from './image-upload.options';
import { ImagesService } from './images.service';

@ApiTags('people images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('people/:personId/images')
export class PersonImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
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
  @UseInterceptors(FilesInterceptor('files', undefined, imageUploadOptions))
  upload(
    @Param('personId', ParseIntPipe) personId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<PersonImage[]> {
    return this.imagesService.upload(personId, files);
  }

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Список картинок людини (з посиланнями url)' })
  @ApiDataResponse(PersonImage, { isArray: true })
  @ApiNotFoundResponse()
  findAll(@Param('personId', ParseIntPipe) personId: number): Promise<PersonImage[]> {
    return this.imagesService.findByPerson(personId);
  }

  @Delete(':imageId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити картинку (запис у БД і файл у S3)' })
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
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER, UserRole.ADMIN)
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
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
