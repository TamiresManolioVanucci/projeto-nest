import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
 
    async execute(id: string): Promise<any> {
        return await this.userRepository.findById(id);
    }
}

