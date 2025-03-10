import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../infrastructure/dtos/create-user.dto";
import { User } from "../domain/entities/user.entity";

@Injectable()
export class CreateUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
 
    execute(body: CreateUserDTO): Promise<any> {
        const user = new User();

        Object.assign(user, body as User);

        return this.userRepository.create(user);
    }
    
}