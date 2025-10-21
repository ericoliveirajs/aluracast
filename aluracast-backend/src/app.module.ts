// src/app.module.ts (CORREÇÃO FINAL PARA IMAGENS)

import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path'; // join é necessário para construir o caminho

@Module({
  imports: [
    // ✅ CORREÇÃO: Usando process.cwd() para garantir que a pasta 'public' seja encontrada
    ServeStaticModule.forRoot({
      // Isso aponta diretamente para a pasta public na raiz do projeto.
      rootPath: join(process.cwd(), 'public'), 
      // serveRoot: '/' - significa que a URL /images/... será mapeada para a pasta public/images/...
      serveRoot: '/', 
    }),
    EpisodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}