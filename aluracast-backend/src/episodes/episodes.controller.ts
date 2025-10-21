// aluracast-backend/src/episodes/episodes.controller.ts

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, // 👈 IMPORTANTE para a segurança
  Request      // 👈 IMPORTANTE para acessar o usuário logado
} from '@nestjs/common'; 
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto'; // 👈 NOVO IMPORT DTO
import { UpdateEpisodeDto } from './dto/update-episode.dto'; // 👈 NOVO IMPORT DTO
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // 👈 IMPORTA A GUARDA
import * as episodeInterface from './interfaces/episode.interface';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  // ⚠️ ROTA PROTEGIDA: POST /episodes
  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto, @Request() req) { 
    // O req.user contém o ID e e-mail do usuário do token (útil para auditoria)
    console.log('Usuário autenticado:', req.user); 
    return this.episodesService.create(createEpisodeDto);
  }
  
  // -------------------------------------------------------------
  // ROTAS PÚBLICAS (GET) - Não exigem token
  // -------------------------------------------------------------

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

  // -------------------------------------------------------------
  // ROTAS PROTEGIDAS (PATCH, DELETE)
  // -------------------------------------------------------------
  
  // ⚠️ ROTA PROTEGIDA: PATCH /episodes/:id
  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  // ⚠️ ROTA PROTEGIDA: DELETE /episodes/:id
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}