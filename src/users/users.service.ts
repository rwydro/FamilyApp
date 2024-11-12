import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dtos";
import {CommandBus} from "@nestjs/cqrs";
import {CreateUserCommand, CreateUserCommandResult} from "./commands/create-user.command";

@Injectable()
export class UsersService {

    constructor(private commandBus: CommandBus) {
    }

    getHello(): string {
        return 'GetUserASD';
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
