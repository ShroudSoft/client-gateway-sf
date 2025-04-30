import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  BUSINESS_ADMIN = 'BUSINESS_ADMIN',
  BUSINESS_SELLER = 'BUSINESS_SELLER',
}

export class CreateBusinessUserDto {
  @ApiProperty({
    description: 'The ID of the business',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @ApiProperty({
    description: 'The ID of the user',
    example: '67890',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The role of the user in the business',
    enum: Role,
    example: Role.BUSINESS_ADMIN,
  })
  @IsEnum(Role)
  role: Role;
}
