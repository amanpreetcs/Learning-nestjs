import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegenerateTokenResponseDto } from './dto/regenerateAccessToken.dto';
import { AuthLocalGuard } from './guards/local-guard.guard';
import { RefreshJwtGuard } from './guards/refreshJwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthLocalGuard)
  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorised Access',
  })
  async login(@Body() loginDto: LoginRequestDto, @Request() req) {
    const userId = req.user;
    return this.authService.login(userId);
  }

  @Get('/regenerate-access-token')
  @UseGuards(RefreshJwtGuard)
  @ApiCreatedResponse({
    type: RegenerateTokenResponseDto,
  })
  @ApiHeader({
    name: 'refresh-token',
    description: 'Refresh Token',
    required: true,
  })
  async regenerateAccessToken(@Request() req) {
    const user = req.user;
    return this.authService.regenerateAccessToken(user);
  }
}
