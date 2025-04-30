import { ApiProperty } from '@nestjs/swagger';
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

export class UpdateExamDto {
  @ApiProperty({ description: 'Title of the exam', example: 'Modified title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'description of the exam',
    example: 'Modified description',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Time for the next attempt in hours',
    example: 72,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly nextAttInHours: number;

  @ApiProperty({
    description: 'List of the modules_id included in the exam',
    example: [3, 4],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  moduleIds: number[];
}
