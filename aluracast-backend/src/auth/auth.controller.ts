// aluracast-backend/src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto'; // 👈 AGORA EM USO!

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Rota: POST /auth/login
  @HttpCode(HttpStatus.OK) // Retorna 200 (OK)
  async login(@Body() loginUserDto: LoginUserDto) { // 👈 USA O DTO AQUI!
    
    // 1. Valida as credenciais (email e senha)
    // Chamamos o método que verifica o hash da senha
    const user = await this.authService.validateUser(
      loginUserDto.email, 
      loginUserDto.password
    );

    // 2. Se a validação falhar, lança erro
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas ou usuário inativo.');
    }

    // 3. Se for bem-sucedido, gera e retorna o token JWT
    return this.authService.login(user);
  }
}