
import { Injectable } from '@nestjs/common';
import { CreateTasksDto, UpdateTasksDto } from './dtos';
import { DbService } from './db/db.service';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DbService) {}

  create(createTasksDto: CreateTasksDto) {
    return this.dbService.createTasks(createTasksDto);
  }

  findAll() {
    return this.dbService.findAllTasks();
  }

  update(id: string, updateTasksDto: UpdateTasksDto) {
    return this.dbService.updateTasks(id, updateTasksDto);
  }
}
