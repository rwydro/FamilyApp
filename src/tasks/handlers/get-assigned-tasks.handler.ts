import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../db/schemas/task.schema';
import { Model } from 'mongoose';
import { User } from '../../db/schemas/user.schema';
import { GetAssignedTasksQuery, GetAssignedTasksQueryResult } from '../queries/get-assigned-tasks.query';

@QueryHandler(GetAssignedTasksQuery)
export class GetAssignedTasksHandler implements ICommandHandler<GetAssignedTasksQuery> {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async execute(query: GetAssignedTasksQuery): Promise<GetAssignedTasksQueryResult> {
    const tasks = await this.taskModel.find({assignee: query.assigneeUserID}).populate('assignee reporter')
    const user = await this.userModel.findOne({_id: query.assigneeUserID})
    return new GetAssignedTasksQueryResult(
      user,
      tasks
    )
  }
}