import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsInt,
  ValidateNested,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/question/dto/question-dto/create-question.dto';

export class CreateModuleBsDto {
  @ApiProperty({ example: 'Modulo cierre ventas' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 45 })
  @IsInt()
  @IsNotEmpty()
  duration_mins: number;

  @ApiProperty({ example: 'business_123' })
  @IsString()
  @IsNotEmpty()
  business_id: string;

  @ApiProperty({ type: [CreateQuestionDto], minItems: 10 })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
