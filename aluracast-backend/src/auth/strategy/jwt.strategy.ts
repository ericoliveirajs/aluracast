import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';

export interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: 'SEGREDO_MUITO_SEGURO_E_COMPLEXO',
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
    return { id: payload.sub, email: payload.email, isActive: true } as Omit<User, 'password'>; 
  }
}