import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOptionDto {
  @ApiPropertyOptional({ example: 'Option B' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  isCorrect: boolean;
}
