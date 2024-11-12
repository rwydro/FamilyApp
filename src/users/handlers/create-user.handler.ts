import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand, CreateUserCommandResult} from "../commands/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
        //throw new Error("Method not implemented.");
        return new CreateUserCommandResult()
    }
}