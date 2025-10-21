import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt'; 
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'SEGREDO_MUITO_SEGURO_E_COMPLEXO', 
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule, AuthService],
})
export class AuthModule {}