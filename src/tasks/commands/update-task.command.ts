import { Types } from 'mongoose';
import { TaskStatus } from '../../db/schemas/task.schema';
import { User } from '../../db/schemas/user.schema';

export class UpdateTaskCommand {
  constructor(
    public readonly _id: string,
    public readonly reporter: Types.ObjectId,
    public readonly assignee: Types.ObjectId,
    public readonly title: string,
    public readonly description: string,
    public readonly creationDate: Date,
    public readonly deadline: Date,
    public readonly taskStatus: TaskStatus,
  ) {}
}

export class UpdateTaskCommandResult {
  constructor(
    public readonly reporter: User,
    public readonly assignee: User,
    public readonly title: string,
    public readonly description: string,
    public readonly creationDate: Date,
    public readonly deadline: Date,
    public readonly taskStatus: TaskStatus,
    public readonly taskId: string,
  ) {}
}