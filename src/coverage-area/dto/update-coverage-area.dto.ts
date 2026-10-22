import { PartialType } from '@nestjs/swagger';
import { CreateCoverageAreaDto } from './create-coverage-area.dto';

export class UpdateCoverageAreaDto extends PartialType(CreateCoverageAreaDto) {}
