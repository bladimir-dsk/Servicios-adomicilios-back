import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCoveragePointDto {
  @IsString()
  @ApiProperty()
  longitude: string;

  @IsString()
  @ApiProperty()
  latitude: string;

  @IsNumber()
  @ApiProperty()
  order: number;
}
