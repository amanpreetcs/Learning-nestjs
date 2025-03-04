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
  async findAll(query: PaginationDto) {
    return await this.propertyRepo.find({
      skip: query.skip,
      take: query.limit,
    });
  }

  async findOne(id: number) {
    const prop = await this.propertyRepo.findOne({ where: { id } });

    if (!prop) throw new NotFoundException();
    return prop;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.propertyRepo.delete({ id });
  }
}
