/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/create-user.use-case";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { HashPasswordPipe } from "src/shared/pipes/hash-password.pipe";
import { ListUserDTO } from "../dtos/list-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    async create(
        @Body() { password, ...body }: CreateUserDTO, 
        @Body('password', HashPasswordPipe) hashedPassword: string
    ) {  
        const userCreated = await this.createUserUseCase.execute({
            ...body,
            password: hashedPassword
        });

        return {
            message: 'Usuario criado com sucesso.',
            user: new ListUserDTO(userCreated.id, userCreated.name)
        };
    }
}