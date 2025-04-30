import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { number } from 'joi';

export class CreateExamDto {
  @ApiProperty({
    description: 'Title of the exam',
    example: 'Examen #1',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({
    description: 'Description of the exam',
    example: 'Descripcion del examen ...',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Time for the next attempt in hours',
    example: 24,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly nextAttInHours: number;

  @ApiProperty({
    description: 'State of the exam (active/inactive)',
    example: 'true',
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if the exam was made by SellFlix',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  sellflix_exam?: boolean;

  @ApiPropertyOptional({
    description: 'Optional business_id if the exam was made by a business',
    example: null,
  })
  @IsString()
  @IsOptional()
  business_id?: string;

  @ApiProperty({
    description: 'List of the modules_id included in the exam',
    example: [1],
    type: [number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  moduleIds: number[];
}
