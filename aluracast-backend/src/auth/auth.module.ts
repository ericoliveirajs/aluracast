// aluracast-backend/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt'; 
import { UsersModule } from '../users/users.module'; // 👈 NOVO IMPORT
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // 1. Permite o uso do UsersService (precisa de 'exports' no UsersModule)
    UsersModule, 
    // 2. Módulo base para estratégias de autenticação
    PassportModule, 
    // 3. Configuração do JWT
    JwtModule.register({
      // A chave que ASSINA o token. Deve ser muito secreta!
      secret: 'SEGREDO_MUITO_SEGURO_E_COMPLEXO', 
      // O token terá validade de 60 minutos
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}