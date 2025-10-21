// aluracast-backend/src/users/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  // Garante que o campo existe e é um formato de e-mail válido
  @IsEmail({}, { message: 'O email fornecido deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  // Garante que a senha não está vazia e tem no mínimo 6 caracteres
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
}