import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Request
} from '@nestjs/common'; 
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as episodeInterface from './interfaces/episode.interface';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto, @Request() req) { 
    console.log('Usuário autenticado:', req.user); 
    return this.episodesService.create(createEpisodeDto);
  }
  
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

  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}