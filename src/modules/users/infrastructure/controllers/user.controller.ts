import { Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/create-user.use-case";

@Controller('users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    @Post()
    async create() {
        
    }
}