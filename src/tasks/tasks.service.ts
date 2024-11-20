
import { Injectable } from '@nestjs/common';
import { CreateTasksDto } from './dtos';
import { CreateTaskCommand, CreateTaskCommandResult } from './commands/create-task.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Model, Types } from 'mongoose';
import { GetAssignedTasksQuery, GetAssignedTasksQueryResult } from './queries/get-assigned-tasks.query';

@Injectable()
export class TasksService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(createTasksDto: CreateTasksDto): Promise<CreateTaskCommandResult> {
    return await this.commandBus.execute<CreateTaskCommand, CreateTaskCommandResult>(new CreateTaskCommand(
      createTasksDto.reporterUser,
      createTasksDto.assignedUser,
      createTasksDto.title,
      createTasksDto.description,
      createTasksDto.creationDate,
      createTasksDto.deadline,
      createTasksDto.taskStatus,
    ));
  }

  findForAssigneeUser(assigneeUserId: Types.ObjectId) {
    return this.queryBus.execute<GetAssignedTasksQuery, GetAssignedTasksQueryResult>(
      new GetAssignedTasksQuery(assigneeUserId)
    );
  }
  //
  // update(id: string, updateTasksDto: UpdateTasksDto) {
  //   return this.dbService.updateTasks(id, updateTasksDto);
  // }
}
