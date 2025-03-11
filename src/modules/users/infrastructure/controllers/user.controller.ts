/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/create-user.use-case";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { HashPasswordPipe } from "src/shared/pipes/hash-password.pipe";
import { ListUserDTO } from "../dtos/list-user.dto";
import { ListUserUseCase } from "../../application/list-user.use-case";
import { FindUserUseCase } from "../../application/find-user.use-case";
import { DeleteUserUseCase } from "../../application/delete-user.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly listUserUseCase: ListUserUseCase,
        private readonly findUserUseCase: FindUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    @Post()
    async create(
        @Body() { password, ...body }: CreateUserDTO,
        @Body('password', HashPasswordPipe) hashedPassword: string
    ) {
        const userCreated = await this.createUserUseCase.execute(null, {
            ...body,
            password: hashedPassword
        });

        return {
            message: 'Usuario criado com sucesso.',
            user: new ListUserDTO(userCreated.id, userCreated.name)
        };
    }

    @Get()
    async list() {
        const userList = await this.listUserUseCase.execute();

        return {
            message: 'Usuario listado.',
            users: userList.map(user => new ListUserDTO(user.id, user.name))
        };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const userFound = await this.findUserUseCase.execute(id);

        return {
            message: 'Usuário encontrado.',
            user: new ListUserDTO(userFound.id, userFound.name)
        };
    }

    @Delete(':id')
    async delete (@Param('id') id: string) {
        const userDeleted = await this.deleteUserUseCase.execute(id);

        return {
            message: 'Usuário deletado',
            user: new ListUserDTO(userDeleted.id, userDeleted.name)
        };
    }

}