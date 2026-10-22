import { Module } from '@nestjs/common';
import { CoverageAreaService } from './coverage-area.service';
import { CoverageAreaController } from './coverage-area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoverageArea } from './entities/coverage-area.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { User } from '@/users/entities/user.entity';
import { CoveragePoint } from '@/coverage-points/entities/coverage-point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoverageArea, Empresa, User, CoveragePoint]),
  ],
  controllers: [CoverageAreaController],
  providers: [CoverageAreaService],
  exports: [CoverageAreaService],
})
export class CoverageAreaModule {}
