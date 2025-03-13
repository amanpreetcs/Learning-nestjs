import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/dbConfig';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    PropertyModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
