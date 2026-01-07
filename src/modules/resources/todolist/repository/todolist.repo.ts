import { Injectable, Inject } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Todolist } from 'src/common/database/todolist.entity';
@Injectable()
export class TodolistRepo {
    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource
    ) { }

    private getManager(manager?: EntityManager): Repository<Todolist> {
        return manager ? manager.getRepository(Todolist) : this.dataSource.getRepository(Todolist);
    }

    
}
