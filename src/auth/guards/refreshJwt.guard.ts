import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers?.['refresh-token']?.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new UnauthorizedException('INVALID REFRESH ACCESS TOKEN');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('REFRESH ACCESS TOKEN HAS BEEN EXPIRED');
    }

    return true;
  }
}
