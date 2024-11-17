import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos";
import {CreateUserCommandResult} from "./commands/create-user.command";
import { InjectModel } from '@nestjs/mongoose';
import { User } from './db/schemas/user.schema';
import { Model } from 'mongoose';
import { GetUsersQueryResult } from './queries/get-users.query';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService, @InjectModel(User.name) private userModel: Model<User>) {}

    @Get()
    getUsers(): Promise<GetUsersQueryResult> {
        return this.usersService.getUsers();
    }

    @Post()
    crateUser(@Body() createUser: CreateUserDto): Promise<CreateUserCommandResult> {
        return this.usersService.createUser(createUser);
    }
}
