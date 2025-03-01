import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/create-user.use-case";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { HashPasswordPipe } from "src/shared/pipes/hash-password.pipe";

@Controller('users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    async create(
        @Body() { password, ...Body }: CreateUserDTO, 
        @Body('password', HashPasswordPipe) hashedPassword: string
    ) {  

    }
}