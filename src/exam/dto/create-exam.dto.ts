import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
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
