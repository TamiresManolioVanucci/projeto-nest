import { CreateUserDTO } from "src/modules/users/infrastructure/dtos/create-user.dto";

export interface UseCase {
    execute(id?: string | null, body?: CreateUserDTO): Promise<any>;
}
