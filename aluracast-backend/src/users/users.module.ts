// aluracast-backend/src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 NOVO IMPORT
import { User } from './entities/user.entity'; // 👈 NOVO IMPORT: A Entidade

@Module({
  imports: [
    // ⚠️ NOVO: Registra a Entidade User neste módulo do TypeORM
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}