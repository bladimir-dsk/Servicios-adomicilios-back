import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCustomerInformationDto } from './dto/create-customer-information.dto';
import { UpdateCustomerInformationDto } from './dto/update-customer-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInformation } from '@/customer-information/entities/customer-information.entity';
import { Repository } from 'typeorm';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';
import { CoverageArea } from '@/coverage-area/entities/coverage-area.entity';

@Injectable()
export class CustomerInformationService {
  constructor(
    @InjectRepository(CustomerInformation)
    private customerInformationRepository: Repository<CustomerInformation>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(CoverageArea)
    private readonly coverageAreaRepository: Repository<CoverageArea>,
  ) {}

  async create(
    createCustomerInformationDto: CreateCustomerInformationDto,
    user: UserActiveInterface,
  ) {
    const empresa = await this.empresaRepository.findOne({
      where: {
        id_empresa: user.id_empresa,
      },
    });
    if (!empresa) {
      throw new BadRequestException('Empresa no encontrada');
    }
    //solo debe poder enviarse una vez la informacion por id_user
    const existingCustomerInformation =
      await this.customerInformationRepository.findOne({
        where: {
          id_user: user.id,
        },
      });
    if (existingCustomerInformation) {
      throw new BadRequestException('Ya existe información para este usuario');
    }

    //validar que la cobertura exista
    const coverageArea = await this.coverageAreaRepository.findOne({
      where: {
        id_coverageArea: createCustomerInformationDto.id_coverageArea,
      },
    });
    if (!coverageArea) {
      throw new BadRequestException('Cobertura no encontrada');
    }

    const customerInformation = this.customerInformationRepository.create({
      ...createCustomerInformationDto,
      empresa,
      userEmail: user.email,
      id_user: user.id,
      creatorName: user.name,
      creatorUser: user.email,
      coverageArea,
    });
    return this.customerInformationRepository.save(customerInformation);
  }

  async findAll(user: UserActiveInterface) {
    return this.customerInformationRepository.find({
      where: {
        id_user: user.id,
      },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const customerInformation =
      await this.customerInformationRepository.findOne({
        where: {
          id_customerInformation: id,
          id_user: user.id,
        },
      });
    if (!customerInformation) {
      throw new BadRequestException('Información del cliente no encontrada');
    }
    return customerInformation;
  }

  async update(
    id: number,
    updateCustomerInformationDto: UpdateCustomerInformationDto,
    user: UserActiveInterface,
  ) {
    const customerInformation = await this.findOne(id, user);
    return this.customerInformationRepository.save({
      ...customerInformation,
      ...updateCustomerInformationDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} customerInformation`;
  }
}
