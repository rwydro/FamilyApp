import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand, CreateUserCommandResult} from "../commands/create-user.command";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../db/schemas/user.schema';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
        //throw new Error("Method not implemented.");
        console.log("@@@ user", JSON.stringify(command))
        const newUser = new this.userModel(command)
        await newUser.save().then((result) => {4
            console.log("@@@ id", JSON.stringify(result));
            if (result.id) {
                console.log("@@@ id", result.id);
            } else {

            }
        })
        const userww = this.userModel.find().exec();
        console.log("@@@ userww", JSON.stringify(userww));
        return new CreateUserCommandResult(
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.description
        )
    }
}