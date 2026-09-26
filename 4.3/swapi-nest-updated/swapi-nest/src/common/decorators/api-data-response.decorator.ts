import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageMetaDto } from '../pagination/page-meta.dto';

interface ApiDataResponseOptions {
  isArray?: boolean;
  paginated?: boolean;
  created?: boolean;
}

export const ApiDataResponse = (
  model: Type<unknown>,
  { isArray = false, paginated = false, created = false }: ApiDataResponseOptions = {},
) => {
  const respond = created ? ApiCreatedResponse : ApiOkResponse;
  return applyDecorators(
    ApiExtraModels(model, PageMetaDto),
    respond({
      schema: {
        properties: {
          data: isArray
            ? { type: 'array', items: { $ref: getSchemaPath(model) } }
            : { $ref: getSchemaPath(model) },
          ...(paginated ? { meta: { $ref: getSchemaPath(PageMetaDto) } } : {}),
        },
      },
    }),
  );
};
