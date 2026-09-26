import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

const NUMERIC_LIKE = /^(unknown|n\/a|none|indefinite|\d[\d.,]*(-\d[\d.,]*)?)$/;

export const TextField = (example: string, maxLength = 255) =>
  applyDecorators(ApiProperty({ example, maxLength }), IsString(), IsNotEmpty(), MaxLength(maxLength));

export const NumericTextField = (example: string) =>
  applyDecorators(
    ApiProperty({ example, description: 'Число у вигляді рядка, або "unknown" / "n/a"' }),
    IsString(),
    Matches(NUMERIC_LIKE, { message: '$property must be numeric text (e.g. "172", "1,358", "30-165") or "unknown" / "n/a"' }),
  );

export const IntField = (example: number) => applyDecorators(ApiProperty({ example }), IsInt(), Min(1));

export const DateField = (example: string) =>
  applyDecorators(ApiProperty({ example, format: 'date' }), IsDateString({ strict: true }));

export const IdField = (example = 1) =>
  applyDecorators(ApiPropertyOptional({ type: Number, example, nullable: true }), IsOptional(), IsInt(), Min(1));

export const IdListField = () =>
  applyDecorators(
    ApiPropertyOptional({ type: [Number], example: [1, 2] }),
    IsOptional(),
    IsArray(),
    ArrayUnique(),
    IsInt({ each: true }),
    Min(1, { each: true }),
  );
