// aluracast-backend/src/episodes/episodes.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import * as episodeInterface from './interfaces/episode.interface';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  @Get()
  // Mantenha síncrono, se o findAll() ainda estiver mockado
  findAll(): episodeInterface.Episode[] {
    return this.episodesService.findAll();
  }

  @Get('latest')
  // Mantenha síncrono, se o findLatest() ainda estiver mockado
  findLatest(): episodeInterface.Episode {
    return this.episodesService.findLatest();
  }

  @Get('playlists/:key')
  // ⚠️ MUDANÇA: Tornar assíncrono (async) e usar await
  async findPlaylist(@Param('key') key: string): Promise<episodeInterface.Episode[]> {
    // ⚠️ MUDANÇA: Usar await para esperar a Promise do Service
    return await this.episodesService.findPlaylist(key);
  }
}