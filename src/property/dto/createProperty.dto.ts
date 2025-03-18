import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Name of the property',
    example: 'High-I Appartments',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the property',
    example: '2BHK appartments with all the facilities.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the property',
    example: 100000,
  })
  @IsInt()
  price: number;
}
