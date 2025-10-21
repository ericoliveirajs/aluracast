// aluracast-backend/src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // 👈 IMPORTANTE
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  // ⚠️ CORREÇÃO: O Controller deve ser listado aqui!
  controllers: [UsersController], 
  providers: [UsersService],
  // ⚠️ Exportamos o Service para ser usado pelo futuro Módulo Auth!
  exports: [UsersService], 
})
export class UsersModule {}