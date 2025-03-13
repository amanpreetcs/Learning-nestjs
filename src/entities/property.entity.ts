import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from './user.entity';
import { PropertyType } from './propertyType.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Property {
  @ApiProperty({
    description: 'Id of the property',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'name of the property',
    example: 'High-I Appartments',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'description of the property',
    example: '2BHK Appartment with all amenities',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'price of the property',
    example: '$500000',
  })
  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedBy: User[];

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}
