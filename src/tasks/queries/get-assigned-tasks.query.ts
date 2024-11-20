import { Types } from 'mongoose';
import { User } from '../../db/schemas/user.schema';
import { Task } from '../../db/schemas/task.schema';

export class GetAssignedTasksQuery {
  constructor(
    public readonly assigneeUserID: Types.ObjectId
  ) {
  }
}

export class GetAssignedTasksQueryResult {
  constructor(
    public readonly user: User,
    public readonly tasks: Task[]
  ) {
  }
}