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
    
    create(user: User): Promise<User> {
        return this.repository.save(user);
    }

    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
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