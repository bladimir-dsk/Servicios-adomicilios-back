import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCoveragePointDto } from '@/coverage-points/dto/create-coverage-point.dto';

export class CreateCoverageAreaDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  colorFill: string;

  @ApiProperty({ type: [CreateCoveragePointDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCoveragePointDto)
  coveragePoints: CreateCoveragePointDto[];
}
