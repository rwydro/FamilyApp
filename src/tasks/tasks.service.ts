
import { Injectable } from '@nestjs/common';
import { CreateUpdateTasksDto } from './dtos';
import { CreateTaskCommand, CreateTaskCommandResult } from './commands/create-task.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { GetAssignedTasksQuery, GetAssignedTasksQueryResult } from './queries/get-assigned-tasks.query';
import { UpdateTaskCommand, UpdateTaskCommandResult } from './commands/update-task.command';
import { GetTaskQuery, GetTaskQueryResult } from './queries/get-task.query';
import { DeleteTaskCommand, DeleteTaskCommandResult } from './commands/delete-task.command';

@Injectable()
export class TasksService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async getById(taskId: Types.ObjectId):Promise<GetTaskQueryResult> {
    return await this.queryBus.execute<GetTaskQuery, GetTaskQueryResult>(
      new GetTaskQuery(taskId)
    );
  }

  async findForAssigneeUser(assigneeUserId: Types.ObjectId):Promise<GetAssignedTasksQueryResult> {
    return await this.queryBus.execute<GetAssignedTasksQuery, GetAssignedTasksQueryResult>(
      new GetAssignedTasksQuery(assigneeUserId)
    );
  }

  async create(createTasksDto: CreateUpdateTasksDto): Promise<CreateTaskCommandResult> {
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

  async update(id: string, updateTasksDto: CreateUpdateTasksDto): Promise<CreateTaskCommandResult> {
    return await this.commandBus.execute<UpdateTaskCommand, UpdateTaskCommandResult>(
      new UpdateTaskCommand(
        id,
        updateTasksDto.reporterUser,
        updateTasksDto.assignedUser,
        updateTasksDto.title,
        updateTasksDto.description,
        updateTasksDto.creationDate,
        updateTasksDto.deadline,
        updateTasksDto.taskStatus,
      )
    )
  }

  async delete(taskId:string): Promise<DeleteTaskCommandResult> {
    return await this.commandBus.execute<DeleteTaskCommand, DeleteTaskCommandResult>(
      new DeleteTaskCommand(taskId)
    )
  }
}
