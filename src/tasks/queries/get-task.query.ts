import { Types } from 'mongoose';
import { User } from '../../db/schemas/user.schema';
import { Task } from '../../db/schemas/task.schema';

export class GetTaskQuery {
  constructor(
    public readonly taskId: Types.ObjectId
  ) {
  }
}

export class GetTaskQueryResult {
  constructor(
    public readonly tasks: Task
  ) {
  }
}