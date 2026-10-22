import { CoveragePoint } from '@/coverage-points/entities/coverage-point.entity';
import { CustomerInformation } from '@/customer-information/entities/customer-information.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coverage_area')
export class CoverageArea {
  @PrimaryGeneratedColumn()
  id_coverageArea: number;

  @Column()
  name: string;

  @Column()
  colorFill: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.coverageAreas)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ nullable: true })
  creatorUser: string;

  @Column({ nullable: true })
  creatorName: string;

  @OneToMany(() => CoveragePoint, (coveragePoint) => coveragePoint.coverageArea)
  coveragePoints: CoveragePoint[];

  @OneToMany(
    () => CustomerInformation,
    (customerInformation) => customerInformation.coverageArea,
  )
  customerInformations: CustomerInformation[];
}
