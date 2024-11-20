import { TaskStatus } from '../../db/schemas/task.schema';
import { User } from '../../db/schemas/user.schema';
import { Types } from 'mongoose';

export class CreateTaskCommand {
  constructor(
    public readonly reporter: Types.ObjectId,
    public readonly assignee: Types.ObjectId,
    public readonly title: string,
    public readonly description: string,
    public readonly creationDate: Date,
    public readonly deadline: Date,
    public readonly taskStatus: TaskStatus,
  ) {}
}

export class CreateTaskCommandResult {
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