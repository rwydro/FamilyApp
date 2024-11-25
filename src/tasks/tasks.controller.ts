
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateUpdateTasksDto } from './dtos';
import { CreateTaskCommandResult } from './commands/create-task.command';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/:id')
  async getById(@Param() params: any) {
    return await this.tasksService.getById(params.id)
  }

  @Get('/:userId')
  async findForAssigneeUser(@Param() params: any) {
    return await this.tasksService.findForAssigneeUser(params.id)
  }

  @Post()
  async create(@Body() createTasksDto: CreateUpdateTasksDto): Promise<CreateTaskCommandResult> {
    return await this.tasksService.create(createTasksDto);
  }

  @Put('/:id')
  async updateTask(@Param() params: any, @Body() createTasksDto: CreateUpdateTasksDto) {
    return await this.tasksService.update(params.id, createTasksDto)
  }

  @Delete('/:id')
  async deleteTask(@Param() params: any) {
    return await this.tasksService.delete(params.id)
  }
}
