import { Module } from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {CreateUserHandler} from "./handlers/create-user.handler";
import {CqrsModule} from "@nestjs/cqrs";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './db/schemas/user.schema';
import { GetUserHandler } from './handlers/get-users.handler';

@Module({
    controllers: [UsersController],
    exports: [
        UsersService,
    ],
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [
        UsersService,
        CreateUserHandler,
        GetUserHandler
    ]
})
export class UsersModule {}