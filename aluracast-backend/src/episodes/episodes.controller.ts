import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import * as episodeInterface from './interfaces/episode.interface';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): episodeInterface.Episode[] {
    return this.episodesService.findAll(); 
  }

  @Get('latest')
  findLatest(): episodeInterface.Episode {
    return this.episodesService.findLatest();
  }
  
  @Get('playlists/:key')
  findPlaylist(@Param('key') key: string): episodeInterface.Episode[] {
      return this.episodesService.findPlaylist(key);
  }
}