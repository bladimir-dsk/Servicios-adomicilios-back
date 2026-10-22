import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerInformationService } from './customer-information.service';
import { CreateCustomerInformationDto } from './dto/create-customer-information.dto';
import { UpdateCustomerInformationDto } from './dto/update-customer-information.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enums/rol.enum';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';
import { ActiveUser } from '@/common/decorators/active-user.decorator';

@ApiBearerAuth('jwt')
@ApiTags('customer-information')
@Controller('customer-information')
export class CustomerInformationController {
  constructor(
    private readonly customerInformationService: CustomerInformationService,
  ) {}

  @Post()
  @Auth(Role.CLIENTE)
  create(
    @Body() createCustomerInformationDto: CreateCustomerInformationDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.customerInformationService.create(
      createCustomerInformationDto,
      user,
    );
  }

  @Get()
  @Auth(Role.CLIENTE)
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.customerInformationService.findAll(user);
  }

  @Get(':id')
  @Auth(Role.CLIENTE)
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.customerInformationService.findOne(+id, user);
  }

  @Patch(':id')
  @Auth(Role.CLIENTE)
  update(
    @Param('id') id: number,
    @Body() updateCustomerInformationDto: UpdateCustomerInformationDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.customerInformationService.update(
      +id,
      updateCustomerInformationDto,
      user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerInformationService.remove(+id);
  }
}
