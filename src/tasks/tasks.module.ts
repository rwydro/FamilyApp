
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DbService } from './db/db.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, DbService],
})
export class TasksModule {}
