import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos";
import {CreateUserCommandResult} from "./commands/create-user.command";
import { GetUsersQueryResult } from './queries/get-users.query';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<GetUsersQueryResult> {
        return this.usersService.getUsers();
    }

    @Post()
    crateUser(@Body() createUser: CreateUserDto): Promise<CreateUserCommandResult> {
        return this.usersService.createUser(createUser);
    }
}
