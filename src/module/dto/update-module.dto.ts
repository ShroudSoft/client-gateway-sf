import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateModuleDto {
  @ApiProperty({
    description: 'Title of the module',
    example: 'Modulo cierre de venta',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Duration in minutes of the module',
    example: 30,
  })
  @IsInt()
  @IsOptional()
  durationMins?: number;
}
