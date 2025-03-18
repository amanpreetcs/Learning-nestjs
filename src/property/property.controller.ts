import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';
import { Property } from 'src/entities/property.entity';

@Controller('property')
export class PropertyController {
  // this is dependency injection i.e. Nest js will inject the propertyService into this controller instead of creating a new instance by itself.
  constructor(private propertyService: PropertyService) {}

  @ApiHeader({
    name: 'access-token',
    description: 'Access Token',
    required: true,
  })
  @UseGuards(JwtGuard)
  @Get()
  @ApiAcceptedResponse({
    type: [Property],
  })
  async findAll(@Query() query: PaginationDto, @Request() req) {
    const userId = req.user.sub;
    return await this.propertyService.findAll(query, userId);
  }

  @ApiHeader({
    name: 'access-token',
    description: 'Access Token',
    required: true,
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiAcceptedResponse({
    type: Property,
  })
  @ApiParam({
    name: 'id',
    description: 'Property Id',
    required: true,
  })
  async findOne(@Param('id', ParseIdPipe) id, @Request() req) {
    const userId = req.user.sub;
    return await this.propertyService.findOne(id, userId);
  }

  @ApiHeader({
    name: 'access-token',
    description: 'Access Token',
    required: true,
  })
  @UsePipes(new ValidationPipe())
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @Post()
  @ApiCreatedResponse({
    type: Property,
  })
  async create(@Body() body: CreatePropertyDto, @Request() req) {
    const userId = req.user.sub;
    return await this.propertyService.create(body, userId);
  }

  @ApiHeader({
    name: 'access-token',
    description: 'Access Token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Property Id',
    required: true,
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiCreatedResponse({
    type: Property,
  })
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIdPipe) id,
    @Body() body: UpdatePropertyDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return await this.propertyService.update(id, body, userId);
  }

  @ApiHeader({
    name: 'access-token',
    description: 'Access Token',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Property Id',
    required: true,
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiAcceptedResponse({
    type: Boolean,
  })
  async delete(@Param('id', ParseIdPipe) id, @Request() req) {
    const userId = req.user.sub;
    return await this.propertyService.delete(id, userId);
  }
}
