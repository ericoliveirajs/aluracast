// aluracast-backend/src/users/users.service.ts

import { Injectable, BadRequestException } from '@nestjs/common'; // Adicionei BadRequestException (opcional, para validação)
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // ⚠️ CORREÇÃO 1: O tipo de entrada agora deve ser o DTO (ou um objeto com garantia de 'email' e 'password')
  // Assumi que você corrigirá a chamada no Controller para usar o DTO real (CreateUserDto).
  // Mantenho Partial<User> apenas para a tipagem, mas adiciono um throw para garantir que a senha exista.
  async createUser(user: Partial<User>): Promise<User> {
    const { email, password } = user;

    // ⚠️ GARANTIA: Verifica se a senha existe para o hash, resolvendo o erro TS.
    if (!password) {
      throw new BadRequestException('A senha é obrigatória.');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  // ⚠️ CORREÇÃO 2: Altera o retorno para 'User | null' (padrão do TypeORM)
  async findOneByEmail(email: string): Promise<User | null> {
    // O TypeORM retorna null se não encontrar o registro
    return this.usersRepository.findOne({ where: { email } });
  }

  // Você pode adicionar um método de comparação de senha aqui também, se desejar!
}