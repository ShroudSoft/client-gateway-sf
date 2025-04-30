import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateOptionDto {
  @ApiProperty({ example: 'Option #_' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCorrect: boolean;
}

class CreateQuestionDto {
  @ApiProperty({ example: 'Pregunta #_' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: [CreateOptionDto], minItems: 4, maxItems: 4 })
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}

export class CreateModuleDto {
  @ApiProperty({ example: 'Modulo cierre ventas' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 45 })
  @IsInt()
  duration_mins: number;

  @ApiProperty({ example: true, required: false })
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  sellflix_module?: boolean;

  @ApiProperty({ example: 'business_123' })
  @IsString()
  @IsOptional()
  business_id?: string;

  @ApiProperty({ type: [CreateQuestionDto], minItems: 10 })
  @IsArray()
  @ArrayMinSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
