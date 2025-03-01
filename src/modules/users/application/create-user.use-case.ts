import { UseCase } from "src/shared/interfaces/use-case.interface";
import { UserRepository } from "../domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
 
    execute(body: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}