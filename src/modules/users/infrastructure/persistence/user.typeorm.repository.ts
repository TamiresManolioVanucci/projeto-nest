import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) { }
    
    async create(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async list(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<User | null> {
        return await this.repository.findOne({ where: { id } }); 
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: {email}
        });
    }
    
    update(id: string, user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}