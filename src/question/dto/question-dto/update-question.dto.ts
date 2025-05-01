import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateOptionDto } from '../option-dto/update-option.dto';

export class UpdateQuestionDto {
  @ApiPropertyOptional({ example: 'Updated question' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ type: [UpdateOptionDto], minItems: 4, maxItems: 4 })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => UpdateOptionDto)
  options?: UpdateOptionDto[];
}
