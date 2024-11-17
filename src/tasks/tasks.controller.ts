
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto, UpdateTasksDto } from './dtos';

@Controller('taskss')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  create(@Body() createTasksDto: CreateTasksDto) {
    return this.tasksService.create(createTasksDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}
