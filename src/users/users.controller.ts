import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos";
import {CreateUserCommandResult} from "./commands/create-user.command";

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): string {
        return this.usersService.getHello();
    }

    @Post()
    crateUser(@Body() createUser: CreateUserDto): Promise<CreateUserCommandResult> {
        return this.usersService.createUser(createUser);
    }
}
