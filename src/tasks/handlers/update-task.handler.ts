import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../db/schemas/task.schema';
import { Model } from 'mongoose';
import { User } from '../../db/schemas/user.schema';
import { UpdateTaskCommand, UpdateTaskCommandResult } from '../commands/update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async execute(command: UpdateTaskCommand): Promise<UpdateTaskCommandResult> {
    const { _id, ...updateData } = command;
    const currentTask = await this.taskModel.findByIdAndUpdate(
      { _id: _id },
      { $set: updateData},
      { new: true }
    ).populate("assignee reporter");

    return new UpdateTaskCommandResult(
      currentTask.reporter,
      currentTask.assignee,
      currentTask.title,
      currentTask.description,
      currentTask.creationDate,
      currentTask.deadline,
      currentTask.taskStatus,
      currentTask.id,
    )
  }
}