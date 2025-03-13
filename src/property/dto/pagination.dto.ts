import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Limit of records to be fetched',
    example: '10',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  @ApiProperty({
    description: 'Offset of records to be fetched',
    example: '0',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  skip: number;
}
