// aluracast-backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// ⚠️ IMPORTS NECESSÁRIOS
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episodes/entities/episode.entity';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';
// ⚠️ NOVO IMPORT: A Entidade User que criamos
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    // ⚠️ BLOCO CRÍTICO DE CONEXÃO COM O BANCO DE DADOS
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'aluracastdb',
      // ⚠️ MUDANÇA: Incluir AMBAS as Entidades aqui!
      entities: [Episode, User],
      synchronize: true,
    }),
    EpisodesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }