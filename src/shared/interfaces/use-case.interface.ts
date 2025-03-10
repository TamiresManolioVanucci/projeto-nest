import { CreateUserDTO } from "src/modules/users/infrastructure/dtos/create-user.dto";

export interface UseCase {
    execute(body: CreateUserDTO): Promise<any>;
}