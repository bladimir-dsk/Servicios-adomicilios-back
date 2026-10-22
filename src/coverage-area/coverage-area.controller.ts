import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoverageAreaService } from './coverage-area.service';
import { CreateCoverageAreaDto } from './dto/create-coverage-area.dto';
import { UpdateCoverageAreaDto } from './dto/update-coverage-area.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';

@Auth([Role.ADMIN, Role.EMPLEADO])
@ApiBearerAuth('jwt')
@ApiTags('Coverage Area')
@Controller('coverage-area')
export class CoverageAreaController {
  constructor(private readonly coverageAreaService: CoverageAreaService) {}

  @Post()
  create(
    @Body() createCoverageAreaDto: CreateCoverageAreaDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.coverageAreaService.create(createCoverageAreaDto, user);
  }

  @Auth([Role.ADMIN, Role.EMPLEADO, Role.CLIENTE])
  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.coverageAreaService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.coverageAreaService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCoverageAreaDto: UpdateCoverageAreaDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.coverageAreaService.update(+id, updateCoverageAreaDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coverageAreaService.remove(+id);
  }
}
