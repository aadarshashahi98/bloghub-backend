import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { BlogModule } from './blog/blog.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as fs from 'fs';
import * as path from 'path';
import { AuthController } from './auth/auth.controller';
import { BlogController } from './blog/blog.controller';
import { ThemeController } from './theme/theme.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { BlogService } from './blog/blog.service';
import { ThemeService } from './theme/theme.service';
import { UserService } from './user/user.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '18094', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8mb4',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ThemeModule,
    BlogModule,
    AuthModule,
    UserModule, // <-- provides UserService & UserController
  ],
  controllers: [AppController, AuthController, BlogController, ThemeController, UserController], // <-- remove UserController here
  providers: [AppService, AuthService, BlogService, ThemeService, UserService],      // <-- remove UserService here
})
export class AppModule {}