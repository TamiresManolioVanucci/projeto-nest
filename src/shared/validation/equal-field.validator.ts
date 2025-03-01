import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";

@Injectable()
export class EqualFieldValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean {
        const { field } = args.constraints;
        const fieldValue = (args.object as any)[field];
        return value === fieldValue;
    }
}

export const EqualField = (property: string, validationOptions?: ValidationOptions) => {
    return (object: object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [property],
            validator: EqualFieldValidator
        });
    }        
}