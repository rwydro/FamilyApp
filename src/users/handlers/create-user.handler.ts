import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand, CreateUserCommandResult} from "../commands/create-user.command";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../db/schemas/user.schema';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
        const newUser = new this.userModel(command)
        await newUser.save()
        return new CreateUserCommandResult(
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.description
        )
    }
}