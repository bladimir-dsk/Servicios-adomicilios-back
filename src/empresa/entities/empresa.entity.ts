import { Category } from '@/category/entities/category.entity';
import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';
import { CoveragePoint } from '@/coverage-points/entities/coverage-point.entity';
import { CustomerInformation } from '@/customer-information/entities/customer-information.entity';
import { Product } from '@/product/entities/product.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column({ nullable: false, default: 'sin name' })
  name: string;

  @Column({ nullable: true })
  rfc: string;

  @OneToMany(() => User, (user) => user.empresa)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Category, (category) => category.empresa)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.empresa)
  products: Product[];

  @OneToMany(
    () => CustomerInformation,
    (customerInformation) => customerInformation.empresa,
  )
  customerInformations: CustomerInformation[];

  @OneToMany(() => CoverageArea, (coverageArea) => coverageArea.empresa)
  coverageAreas: CoverageArea[];

  @OneToMany(() => CoveragePoint, (coveragePoint) => coveragePoint.empresa)
  coveragePoints: CoveragePoint[];
}
