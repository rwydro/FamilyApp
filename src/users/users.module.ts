import { Module } from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {CreateUserHandler} from "./handlers/create-user.handler";
import {CqrsModule} from "@nestjs/cqrs";

export const CommandHandlers = [CreateUserHandler]

@Module({
    imports: [CqrsModule],
    controllers: [UsersController],
    providers: [UsersService, CreateUserHandler],
    exports: [
        UsersService,
        CreateUserHandler
    ],
})
export class UsersModule {}