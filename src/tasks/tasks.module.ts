
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from '../db/schemas/task.schema';
import { CreateTaskHandler } from './handlers/create-task.handler';
import { User, UserSchema } from '../db/schemas/user.schema';
import { GetAssignedTasksHandler } from './handlers/get-assigned-tasks.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }, { name: User.name, schema: UserSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    CreateTaskHandler,
    GetAssignedTasksHandler
  ],
})
export class TasksModule {}
