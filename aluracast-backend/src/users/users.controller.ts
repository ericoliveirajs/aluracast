// aluracast-backend/src/users/users.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; // DTO que garante o formato da requisição
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // 👈 1. INJEÇÃO DO SERVICE

  @Post('register') // 👈 2. DEFINIÇÃO DA ROTA: POST /users/register
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    
    // ⚠️ Validação adicional para evitar duplicidade ANTES de criar
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Este endereço de e-mail já está em uso.');
    }
    
    // 3. CHAMA O SERVICE (que faz o hashing da senha)
    const newUser = await this.usersService.createUser(createUserDto);

    // 4. Garante que a senha criptografada não retorne na resposta
    // Clonamos o objeto e removemos a propriedade 'password'
    const { password, ...result } = newUser;
    return result;
  }
}