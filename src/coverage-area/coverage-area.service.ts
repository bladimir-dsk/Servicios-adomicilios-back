import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoverageAreaDto } from './dto/create-coverage-area.dto';
import { UpdateCoverageAreaDto } from './dto/update-coverage-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoverageArea } from './entities/coverage-area.entity';
import { Repository } from 'typeorm';
import { Empresa } from '@/empresa/entities/empresa.entity';
import { CoveragePoint } from '@/coverage-points/entities/coverage-point.entity';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';

@Injectable()
export class CoverageAreaService {
  constructor(
    @InjectRepository(CoverageArea)
    private coverageAreaRepository: Repository<CoverageArea>,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    @InjectRepository(CoveragePoint)
    private coveragePointRepository: Repository<CoveragePoint>,
  ) {}
  async create(
    createCoverageAreaDto: CreateCoverageAreaDto,
    user: UserActiveInterface,
  ) {
    const empresa = await this.empresaRepository.findOne({
      where: { id_empresa: user.id_empresa },
    });
    if (!empresa) {
      throw new BadRequestException('Empresa no encontrada');
    }
    const newCoverageArea = this.coverageAreaRepository.create({
      ...createCoverageAreaDto,
      empresa,
      creatorName: user.name,
      creatorUser: user.email,
    });
    const savedCoverageArea =
      await this.coverageAreaRepository.save(newCoverageArea);
    const coveragePoints = createCoverageAreaDto.coveragePoints.map(
      (coveragePoint) => {
        return this.coveragePointRepository.create({
          ...coveragePoint,
          coverageArea: savedCoverageArea,
          empresa: empresa,
          creatorName: user.name,
          creatorUser: user.email,
        });
      },
    );
    await this.coveragePointRepository.save(coveragePoints);
    return {
      msg: 'Área de cobertura creada exitosamente',
      coverageArea: savedCoverageArea,
      // coveragePoints,
    };
  }

  async findAll(user: UserActiveInterface) {
    const coverageAreas = await this.coverageAreaRepository.find({
      where: { empresa: { id_empresa: user.id_empresa } },
      relations: ['coveragePoints'],
    });
    return {
      msg: 'Áreas de cobertura obtenidas exitosamente',
      coverageAreas: {
        total: coverageAreas.length,
        data: coverageAreas.map((coverageArea) => ({
          //deslozar los campos
          id_coverage_area: coverageArea.id_coverageArea,
          name: coverageArea.name,
          color: coverageArea.colorFill,
          //deslozar los campos de coveragepoints
          coveragePoints: coverageArea.coveragePoints.map((coveragePoint) => ({
            id_coverage_point: coveragePoint.id_coveragePoint,
            latitude: coveragePoint.latitude,
            longitude: coveragePoint.longitude,
            order: coveragePoint.order,
          })),
        })),
      },
    };
  }

  async findOne(id: number, user: UserActiveInterface) {
    const coverageArea = await this.coverageAreaRepository.findOne({
      where: { id_coverageArea: id, empresa: { id_empresa: user.id_empresa } },
      relations: ['coveragePoints'],
    });
    return {
      msg: 'Área de cobertura obtenida exitosamente',
      coverageArea: {
        id_coverage_area: coverageArea.id_coverageArea,
        name: coverageArea.name,
        color: coverageArea.colorFill,
        coveragePoints: coverageArea.coveragePoints.map((coveragePoint) => ({
          id_coverage_point: coveragePoint.id_coveragePoint,
          latitude: coveragePoint.latitude,
          longitude: coveragePoint.longitude,
          order: coveragePoint.order,
        })),
      },
    };
  }

  async update(
    id: number,
    updateCoverageAreaDto: UpdateCoverageAreaDto,
    user: UserActiveInterface,
  ) {
    const coverageArea = await this.coverageAreaRepository.findOne({
      where: { id_coverageArea: id, empresa: { id_empresa: user.id_empresa } },
    });
    if (!coverageArea) {
      throw new NotFoundException('Área de cobertura no encontrada');
    }
    if (updateCoverageAreaDto.coveragePoints) {
      const coveragePoints = await this.coveragePointRepository.find({
        where: {
          coverageArea: { id_coverageArea: coverageArea.id_coverageArea },
        },
      });
      //eliminar los puntos de cobertura
      await this.coveragePointRepository.remove(coveragePoints);
      //crear los nuevos puntos de cobertura
      for (const coveragePoint of updateCoverageAreaDto.coveragePoints) {
        const newCoveragePoint = this.coveragePointRepository.create({
          ...coveragePoint,
          coverageArea: { id_coverageArea: coverageArea.id_coverageArea },
          empresa: { id_empresa: user.id_empresa },
          creatorName: user.name,
          creatorUser: user.email,
        });
        await this.coveragePointRepository.save(newCoveragePoint);
      }
      const { coveragePoints: _, ...coverageAreaData } = updateCoverageAreaDto;
      Object.assign(coverageArea, coverageAreaData);
      const updatedCoverageArea =
        await this.coverageAreaRepository.save(coverageArea);
      return {
        msg: 'Área de cobertura actualizada exitosamente',
        coverageArea: updatedCoverageArea,
        coveragePoints: updatedCoverageArea.coveragePoints,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} coverageArea`;
  }
}
