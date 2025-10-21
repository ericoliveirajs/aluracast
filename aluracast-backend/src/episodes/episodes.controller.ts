import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entities/episode.entity';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  @Get()
  findAll(): Episode[] {
    return this.episodesService.findAll();
  }

  @Get('latest')
  findLatest(): Episode {
    return this.episodesService.findLatest();
  }

  @Get('playlists/:key')
  async findPlaylist(@Param('key') key: string): Promise<Episode[]> {
    return await this.episodesService.findPlaylist(key);
  }
}