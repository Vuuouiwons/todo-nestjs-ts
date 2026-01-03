import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';

import { Todo } from './todo.entity';
import { Todolist } from './todolist.entity';
import { User } from './user.entity';


const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Todolist,
          Todo
        ],
        synchronize: true ? process.env.ENVIRONMENT === 'dev' : false,
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
