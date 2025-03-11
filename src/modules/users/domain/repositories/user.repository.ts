import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract list(): Promise<User[]>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract update(id: string, user: User): Promise<User>;
    abstract delete(id: string): Promise<void>;
}