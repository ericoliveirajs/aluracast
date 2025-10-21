// aluracast-backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 NOVO
import { EpisodesModule } from './episodes/episodes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // 👈 CONEXÃO MYSQL
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, // Porta 3306, confirmada!
      username: 'root', 
      password: 'root', 
      database: 'aluracastdb', // Nome do Banco de Dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Onde suas Entidades estarão
      synchronize: true, // Cria tabelas automaticamente (apenas para DEV)
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), 
      serveRoot: '/', 
    }),
    EpisodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}