import { Module } from '@nestjs/common';
import { CustomerInformationService } from './customer-information.service';
import { CustomerInformationController } from './customer-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInformation } from './entities/customer-information.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { User } from '@/users/entities/user.entity';
import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerInformation,
      Empresa,
      User,
      CoverageArea,
    ]),
  ],
  controllers: [CustomerInformationController],
  providers: [CustomerInformationService],
  exports: [CustomerInformationService],
})
export class CustomerInformationModule {}
