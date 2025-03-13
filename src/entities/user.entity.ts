import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'Id of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'First name of the user',
    example: 'Rahul',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Dewedi',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'email of the user',
    example: 'rahul@gmail.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Creation date of the user account',
    example: '2025-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Password of the user account',
    example: 'password',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Role of the user account',
    example: Role.CUSTOMER,
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' })
  likedProperties: Property[];

  @BeforeInsert()
  async hashedPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
