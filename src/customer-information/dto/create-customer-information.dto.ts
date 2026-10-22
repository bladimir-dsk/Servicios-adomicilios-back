import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerInformationDto {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  secondName: string;

  @IsString()
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  intersectionOne: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  intersectionTwo?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  houseNumber?: string;

  @IsString()
  @ApiProperty()
  reference: string;

  @IsString()
  @ApiProperty()
  latitude: string;

  @IsString()
  @ApiProperty()
  longitude: string;

  @IsNumber()
  @ApiProperty()
  id_coverageArea: number;
}
