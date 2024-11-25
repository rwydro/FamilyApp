import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../db/schemas/task.schema';
import { User } from '../../db/schemas/user.schema';
import { DeleteTaskCommand, DeleteTaskCommandResult } from '../commands/delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async execute(command: DeleteTaskCommand): Promise<DeleteTaskCommandResult> {
    const removedTask = await this.taskModel.deleteOne({ _id: command.taskId });
    return new DeleteTaskCommandResult(command.taskId)
  }
}