import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(id: string): Promise<any> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        await this.userRepository.delete(id);

        return user;
    }
}

