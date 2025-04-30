import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessUserDto, Role } from './create-business-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateBusinessUserDto extends PartialType(CreateBusinessUserDto) {
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
