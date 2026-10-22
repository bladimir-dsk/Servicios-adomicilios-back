import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customer_information')
export class CustomerInformation {
  @PrimaryGeneratedColumn()
  id_customerInformation: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  code: string;

  @Column()
  phone: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  intersectionOne: string;

  @Column({ nullable: true })
  intersectionTwo: string;

  @Column({ nullable: true })
  houseNumber: string;

  @Column()
  reference: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.customerInformations)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @ManyToOne(() => User, (user) => user.customerInformations)
  // @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: User;

  @Column()
  userEmail: string;

  @Column()
  id_user: number;

  @Column({ nullable: true })
  creatorUser: string;

  @Column({ nullable: true })
  creatorName: string;

  @ManyToOne(
    () => CoverageArea,
    (coverageArea) => coverageArea.customerInformations,
  )
  @JoinColumn({ name: 'id_coverageArea' })
  coverageArea: CoverageArea;
}
