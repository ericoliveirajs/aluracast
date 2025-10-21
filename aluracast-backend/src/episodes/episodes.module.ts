// aluracast-backend/src/episodes/episodes.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 NOVO: Importa o módulo do TypeORM
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity'; // 👈 NOVO: Importa a Entidade

@Module({
  imports: [
    // 👈 NOVO: Registra a Entidade Episode para este módulo.
    // Isso injeta o Repositório no EpisodesService.
    TypeOrmModule.forFeature([Episode]) 
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}