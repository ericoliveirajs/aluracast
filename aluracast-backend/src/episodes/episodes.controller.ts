// aluracast-backend/src/episodes/episodes.controller.ts

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
import { Episode } from './entities/episode.entity'; // 👈 Usamos a Entidade TypeORM
// import * as episodeInterface from './interfaces/episode.interface'; // 👈 Não precisa mais desta interface

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  // ⚠️ ROTA PROTEGIDA E AGORA ASYNC
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() createEpisodeDto: CreateEpisodeDto, @Request() req): Promise<Episode> { 
    console.log('Usuário autenticado:', req.user); 
    return this.episodesService.create(createEpisodeDto);
  }

  // ⚠️ ROTA PÚBLICA E AGORA ASYNC
  @Get()
  async findAll(): Promise<Episode[]> {
    return this.episodesService.findAll();
  }

  // ⚠️ ROTA PÚBLICA E AGORA ASYNC
  @Get('latest')
  async findLatest(): Promise<Episode> {
    return this.episodesService.findLatest();
  }
  
  // ⚠️ ROTA PÚBLICA E AGORA ASYNC
  @Get('playlists/:key')
  async findPlaylist(@Param('key') key: string): Promise<Episode[]> {
      return this.episodesService.findPlaylist(key);
  }

  // ⚠️ ROTA PÚBLICA E AGORA ASYNC
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Episode> {
    return this.episodesService.findOne(+id);
  }
  
  // ⚠️ ROTA PROTEGIDA E AGORA ASYNC
  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto): Promise<Episode> {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  // ⚠️ ROTA PROTEGIDA E AGORA ASYNC
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}