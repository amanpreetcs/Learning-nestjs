import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLocalGuard } from './guards/local-guard.guard';
import { RefreshJwtGuard } from './guards/refreshJwt.guard';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthLocalGuard)
  @Post('login')
  // @ApiCreatedResponse({
  //   type: {
  //     access_token: 'string',
  //     refresh_token: 'string',
  //   },
  // })
  async login(@Request() req) {
    const userId = req.user;
    return this.authService.login(userId);
  }

  @Get('/regenerate-access-token')
  @UseGuards(RefreshJwtGuard)
  async regenerateAccessToken(@Request() req) {
    const user = req.user;

    return this.authService.regenerateAccessToken(user);
  }
}
