import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoveragePointsService } from './coverage-points.service';
import { CreateCoveragePointDto } from './dto/create-coverage-point.dto';
import { UpdateCoveragePointDto } from './dto/update-coverage-point.dto';

@Controller('coverage-points')
export class CoveragePointsController {
  constructor(private readonly coveragePointsService: CoveragePointsService) {}

  @Post()
  create(@Body() createCoveragePointDto: CreateCoveragePointDto) {
    return this.coveragePointsService.create(createCoveragePointDto);
  }

  @Get()
  findAll() {
    return this.coveragePointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coveragePointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoveragePointDto: UpdateCoveragePointDto) {
    return this.coveragePointsService.update(+id, updateCoveragePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coveragePointsService.remove(+id);
  }
}
