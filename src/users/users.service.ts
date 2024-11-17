import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dtos";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {CreateUserCommand, CreateUserCommandResult} from "./commands/create-user.command";
import { GetUsersQuery, GetUsersQueryResult } from './queries/get-users.query';

@Injectable()
export class UsersService {

    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
    }

    async getUsers(): Promise<GetUsersQueryResult> {
        return await this.queryBus.execute<GetUsersQuery, GetUsersQueryResult>(new GetUsersQuery());
    }

    async createUser(userData: CreateUserDto):  Promise<CreateUserCommandResult>  {
        return await this.commandBus.execute<CreateUserCommand, CreateUserCommandResult>(
            new CreateUserCommand(
                userData.email,
                userData.name,
                userData.password,
                userData.description,
            ),
        )
    }
}
