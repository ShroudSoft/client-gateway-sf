import { PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './create-business.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
  @ApiProperty({
    description: 'The name of the business',
    example: 'Business Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Maximum number of sellers allowed',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  maxSellers: number;

  @ApiProperty({
    description: 'Maximum number of modules allowed',
    example: 5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  maxModules: number;

  @ApiProperty({
    description: 'Whether modules are exclusive to this business',
    example: true,
  })
  @IsBoolean()
  exclusiveModules: boolean;
}
