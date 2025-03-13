import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user.id;
  }

  async login(userId: string) {
    const user = await this.userService.findOne(Number(userId));
    if (!user) throw new NotFoundException();
    return {
      access_token: await this.jwtService.signAsync({
        sub: userId,
        role: user.role,
        secret: process.env.JWT_SECRET,
      }),
      refresh_access_token: await this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '1d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      ),
    };
  }

  async regenerateAccessToken(user: string) {
    const accessToken = await this.jwtService.signAsync({
      sub: user,
    });
    return { accessToken };
  }
}
