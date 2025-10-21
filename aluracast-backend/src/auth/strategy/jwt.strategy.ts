// aluracast-backend/src/auth/strategy/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';

// Define a estrutura do que esperamos no token
export interface JwtPayload {
  email: string;
  sub: number; // ID do usuário
}

@Injectable()
// Extende Strategy (que vem do 'passport-jwt')
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Onde buscar o JWT: Do cabeçalho 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      // 2. Não ignora a expiração do token (garante que tokens vencidos sejam rejeitados)
      ignoreExpiration: false, 
      // 3. O segredo que usamos para assinar/descriptografar o token
      secretOrKey: 'SEGREDO_MUITO_SEGURO_E_COMPLEXO', // ⚠️ DEVE ser o MESMO do AuthModule!
    });
  }

  // 4. Método de validação: chamado APÓS o token ser descriptografado com sucesso
  async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
    // Retorna os dados que serão injetados em req.user
    return { id: payload.sub, email: payload.email, isActive: true } as Omit<User, 'password'>; 
  }
}