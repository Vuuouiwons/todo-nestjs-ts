import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './v1/hello/hello.module';
import { UserModule } from './v1/user/user.module';
import { TodolistsModule } from './v1/todolists/todolists.module';
import { TodoModule } from './v1/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [],
      synchronize: true,
    }),
    HelloModule, UserModule, TodolistsModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
