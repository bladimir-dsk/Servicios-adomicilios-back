import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coverage_point')
export class CoveragePoint {
  @PrimaryGeneratedColumn()
  id_coveragePoint: number;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  order: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.coveragePoints)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column({ nullable: true })
  creatorUser: string;

  @Column({ nullable: true })
  creatorName: string;

  @ManyToOne(() => CoverageArea, (coverageArea) => coverageArea.coveragePoints)
  @JoinColumn({ name: 'id_coverageArea' })
  coverageArea: CoverageArea;
}
