import { Injectable } from '@nestjs/common';
import { CreateCoveragePointDto } from './dto/create-coverage-point.dto';
import { UpdateCoveragePointDto } from './dto/update-coverage-point.dto';

@Injectable()
export class CoveragePointsService {
  create(createCoveragePointDto: CreateCoveragePointDto) {
    return 'This action adds a new coveragePoint';
  }

  findAll() {
    return `This action returns all coveragePoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coveragePoint`;
  }

  update(id: number, updateCoveragePointDto: UpdateCoveragePointDto) {
    return `This action updates a #${id} coveragePoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} coveragePoint`;
  }
}
