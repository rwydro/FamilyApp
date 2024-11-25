import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../db/schemas/task.schema';
import { Model } from 'mongoose';
import { User } from '../../db/schemas/user.schema';
import { GetTaskQuery, GetTaskQueryResult } from '../queries/get-task.query';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements ICommandHandler<GetTaskQuery> {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async execute(query: GetTaskQuery): Promise<GetTaskQueryResult> {
    const tasks = await this.taskModel.findOne({_id: query.taskId}).populate('assignee reporter')
    return new GetTaskQueryResult(
      tasks
    )
  }
}