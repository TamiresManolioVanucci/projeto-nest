import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    execute(): Promise<any> {
        return this.userRepository.list();
    }
}