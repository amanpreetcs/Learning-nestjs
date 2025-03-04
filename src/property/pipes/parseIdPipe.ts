import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);

    if (isNaN(val))
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    else if (val <= 0)
      throw new BadRequestException(
        `Validation failed. "${val}" is not a positive integer.`,
      );

    return val;
  }
}
