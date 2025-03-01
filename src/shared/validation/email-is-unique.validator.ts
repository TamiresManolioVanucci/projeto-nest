import { Injectable, NotFoundException } from "@nestjs/common";
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) { }

    async validate(value: string): Promise<boolean> {
        try {
            const userExists = await this.userRepository.findByEmail(value);

            return !userExists;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return true;
            }
        
            throw error;
        }
    }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueValidator
        });
    }        
}