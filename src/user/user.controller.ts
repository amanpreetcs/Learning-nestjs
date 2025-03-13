import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/property/dto/pagination.dto';
import { ParseIdPipe } from 'src/property/pipes/parseIdPipe';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiAcceptedResponse({
    type: [User],
  })
  findAll(query: PaginationDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiAcceptedResponse({
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @ApiCreatedResponse({
    type: Boolean,
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async update(
    @Param('id', ParseIdPipe) id,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    return result.affected === 1;
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(+id);
    return result.affected === 1;
  }

  @Get(':id/properties')
  @ApiAcceptedResponse({
    type: [User],
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  getAllProperties(@Param('id', ParseIdPipe) id) {
    return this.userService.getAllProperties(id);
  }
}
