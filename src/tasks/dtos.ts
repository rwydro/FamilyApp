import { TaskStatus } from '../db/schemas/task.schema';
import { Types } from 'mongoose';

export class CreateTasksDto {
  readonly reporterUser: Types.ObjectId
  readonly assignedUser: Types.ObjectId;
  readonly title: string;
  readonly description: string;
  readonly creationDate: Date;
  readonly deadline: Date;
  readonly taskStatus: TaskStatus;
  readonly taskId: string;
}
