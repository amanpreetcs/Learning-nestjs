import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/Roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('property')
export class PropertyController {
  // this is dependency injection i.e. Nest js will inject the propertyService into this controller instead of creating a new instance by itself.
  constructor(private propertyService: PropertyService) {}

  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.propertyService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIdPipe) id) {
    return await this.propertyService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: CreatePropertyDto) {
    return await this.propertyService.create(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIdPipe) id, @Body() body: UpdatePropertyDto) {
    return await this.propertyService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIdPipe) id) {
    return await this.propertyService.delete(id);
  }
}
