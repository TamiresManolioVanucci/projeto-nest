import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { UpdateUserDTO } from "../infrastructure/dtos/update-user.dto";
import { Injectable } from "@nestjs/common";
import { HashPasswordPipe } from "src/shared/pipes/hash-password.pipe";

@Injectable()
export class UpdateUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(id: string, body: UpdateUserDTO): Promise<any> {
        if (!id) {
            throw new Error("ID do usuário é obrigatório.");
        }

        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        if (body.password) {
            const hashedPassword = await new HashPasswordPipe().transform(body.password);
            body.password = hashedPassword;
        }

        Object.assign(existingUser, body);

        return await this.userRepository.update(existingUser);
    }
}
