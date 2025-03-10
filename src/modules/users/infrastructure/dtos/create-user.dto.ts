import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";
import { EmailIsUnique } from "src/shared/validation/email-is-unique.validator";
import { EqualField } from "src/shared/validation/equal-field.validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O campo name não pode ser vazio' })
    name: string;

    @IsEmail(undefined, { message: 'O email informado é invalido' })
    @EmailIsUnique({message: 'Já existe um usuario com esse e-mail'})
    email: string;

    @MinLength(8, {message: 'A senha precisar ter no minimo 8 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.' })
    password: string;

    @EqualField('password', {message: 'O campo confirmation_password deve ser igual ao campo password'})
    confirmation_password: string;
}