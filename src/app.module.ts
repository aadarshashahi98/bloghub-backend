import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { BlogModule } from './blog/blog.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_port || '3308', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
  controllers: [AppController], // <-- remove UserController here
  providers: [AppService],      // <-- remove UserService here
})
export class AppModule {}