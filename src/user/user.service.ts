import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/property/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll(query: PaginationDto) {
    return this.userRepo.find({
      skip: query.skip,
      take: query.limit,
    });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }
}
