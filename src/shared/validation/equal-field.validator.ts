/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// Validador que compara dois campos
@Injectable()
@ValidatorConstraint({ async: false })
export class EqualFieldValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    // O campo a ser comparado vem de `constraints` e não do próprio `property`
    const [relatedField] = args.constraints;
    const relatedFieldValue = (args.object as any)[relatedField];
    
    // Verifica se os dois campos são iguais
    return value === relatedFieldValue;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be equal to ${args.constraints[0]}`;
  }
}

// Decorador personalizado para comparação entre campos
export const EqualField = (relatedField: string, validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [relatedField], // Aqui, passa o nome do campo que você quer comparar
      validator: EqualFieldValidator
    });
  };
};
