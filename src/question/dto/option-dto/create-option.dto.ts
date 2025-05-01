import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({ example: 'Option #_' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCorrect: boolean;
}
