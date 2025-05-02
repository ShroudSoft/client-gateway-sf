import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOptionDto } from '../option-dto/create-option.dto';

export class CreateQuestionDto {
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
