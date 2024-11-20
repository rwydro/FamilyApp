import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTaskCommand,
  CreateTaskCommandResult } from '../commands/create-task.command';
import { Task } from '../../db/schemas/task.schema';
import { User } from '../../db/schemas/user.schema';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async execute(command: CreateTaskCommand): Promise<CreateTaskCommandResult> {
    const newTask = new this.taskModel(command)
    await newTask.save();
    const reporter = await this.userModel.findById({_id: newTask.reporter});
    const assignee = await this.userModel.findById({_id: newTask.assignee});
    return new CreateTaskCommandResult(
      reporter,
      assignee,
      newTask.title,
      newTask.description,
      newTask.creationDate,
      newTask.deadline,
      newTask.taskStatus,
      newTask.id,
    )
  }
}