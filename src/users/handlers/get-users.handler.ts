import { ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { GetUsersQuery, GetUsersQueryResult } from '../queries/get-users.query';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../db/schemas/user.schema';
import { Model } from 'mongoose';

@QueryHandler(GetUsersQuery)
export class GetUserHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async execute(): Promise<GetUsersQueryResult> {
    const users: User[] = await this.userModel.find().exec();
    console.log("@@@", users)
    return new GetUsersQueryResult(users);
  }
}