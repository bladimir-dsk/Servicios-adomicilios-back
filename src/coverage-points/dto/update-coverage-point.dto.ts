import { PartialType } from '@nestjs/swagger';
import { CreateCoveragePointDto } from './create-coverage-point.dto';

export class UpdateCoveragePointDto extends PartialType(CreateCoveragePointDto) {}
