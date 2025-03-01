import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user.entity";
import { UserController } from "./infrastructure/controllers/user.controller";
import { UserTypeOrmRepository } from "./infrastructure/persistence/user.typeorm.repository";
import { CreateUserUseCase } from "./application/create-user.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository', 
            useClass: UserTypeOrmRepository
        },
        CreateUserUseCase
    ],
    exports: ['UserRepository']
})
export class UsersModule {}