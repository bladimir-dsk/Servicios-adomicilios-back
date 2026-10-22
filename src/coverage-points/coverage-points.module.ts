import { Module } from '@nestjs/common';
import { CoveragePointsService } from './coverage-points.service';
import { CoveragePointsController } from './coverage-points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoveragePoint } from '@/coverage-points/entities/coverage-point.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { User } from '@/users/entities/user.entity';
import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoveragePoint, Empresa, User, CoverageArea]),
  ],
  controllers: [CoveragePointsController],
  providers: [CoveragePointsService],
})
export class CoveragePointsModule {}
