
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dtos';
import { CreateTaskCommandResult } from './commands/create-task.command';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTasksDto: CreateTasksDto): Promise<CreateTaskCommandResult> {
    return await this.tasksService.create(createTasksDto);
  }

  @Get('/:id')
  async findForAssigneeUser(@Param() params: any) {
    return await this.tasksService.findForAssigneeUser(params.id)
  }
}
