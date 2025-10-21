// aluracast-backend/src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Para encontrar o usuário
import { JwtService } from '@nestjs/jwt'; // Para gerar o token
import * as bcrypt from 'bcrypt'; // Para comparar a senha
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // 👈 Injeção do UsersService
    private jwtService: JwtService, // 👈 Injeção do JwtService
  ) {}

  // ⚠️ MÉTODO 1: Validação de Credenciais (Email e Senha)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.isActive) {
      // Compara a senha fornecida com o hash salvo no DB
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        // Remove a senha do objeto antes de retornar
        const { password, ...result } = user;
        return result; // Retorna o usuário validado, sem a senha
      }
    }
    // Se a comparação falhar ou o usuário não existir/estiver inativo, lança exceção
    return null; // Retornamos null para a estratégia local do Passport, mas a lógica final pode ser uma exceção
  }

  // ⚠️ MÉTODO 2: Geração do Token (Login)
  async login(user: User) {
    // Payload (o que estará dentro do token)
    const payload = { email: user.email, sub: user.id }; 

    return {
      // O token gerado, assinado pela chave secreta que definimos no AuthModule
      access_token: this.jwtService.sign(payload), 
      user: {
        id: user.id,
        email: user.email
      }
    };
  }
}