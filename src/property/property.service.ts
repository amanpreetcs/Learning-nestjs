import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}
  async findAll(query: PaginationDto, userId: number) {
    return await this.propertyRepo.find({
      skip: query.skip,
      take: query.limit,
      where: {
        user: { id: userId },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const prop = await this.propertyRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!prop) throw new NotFoundException();
    return prop;
  }

  async create(dto: CreatePropertyDto, userId: number) {
    return await this.propertyRepo.save({ ...dto, user: { id: userId } });
  }

  async update(id: number, dto: UpdatePropertyDto, userId: number) {
    return await this.propertyRepo.update({ id, user: { id: userId } }, dto);
  }

  async delete(id: number, userId: number) {
    return await this.propertyRepo.delete({ id, user: { id: userId } });
  }
}
