import { ApiProperty } from '@nestjs/swagger';

export class RegenerateTokenResponseDto {
  @ApiProperty()
  access_token: string;
}
