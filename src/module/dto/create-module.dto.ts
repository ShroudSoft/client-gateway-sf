import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsInt,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from 'src/question/dto/question-dto/create-question.dto';

export class CreateModuleDto {
  @ApiProperty({ example: 'Modulo cierre ventas' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 45 })
  @IsInt()
  duration_mins: number;

  @ApiProperty({ type: [CreateQuestionDto], minItems: 10 })
  @IsArray()
  @ArrayMinSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
