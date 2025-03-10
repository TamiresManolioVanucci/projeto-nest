import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user.entity";
import { UserController } from "./infrastructure/controllers/user.controller";
import { UserTypeOrmRepository } from "./infrastructure/persistence/user.typeorm.repository";
import { CreateUserUseCase } from "./application/create-user.use-case";
import { UserRepository } from './domain/repositories/user.repository'; 
import { EmailIsUniqueValidator } from "src/shared/validation/email-is-unique.validator";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        {
            provide: UserRepository,
            useClass: UserTypeOrmRepository,
        },
        EmailIsUniqueValidator,
        CreateUserUseCase,
    ],
    exports: [UserRepository, EmailIsUniqueValidator]
})
export class UsersModule {}
