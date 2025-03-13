import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/dbConfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwtConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig, jwtConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    PropertyModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
