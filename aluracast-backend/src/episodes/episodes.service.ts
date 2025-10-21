// aluracast-backend/src/episodes/episodes.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity'; 

// ⚠️ REMOÇÃO DE DADOS: A constante MOCK foi removida para limpar o código.
// O Seed (população) já foi executado no banco.

@Injectable()
export class EpisodesService implements OnModuleInit {

  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>, 
  ) {}

  // ⚠️ ATUALIZADO: Método de SEED modificado para apenas verificar se o DB está vazio
  async onModuleInit() {
    // Conta quantos episódios existem no banco
    const count = await this.episodesRepository.count();
    
    // Alerta se o banco estiver vazio, mas não tenta mais popular, 
    // pois os dados MOCK foram removidos do código-fonte.
    if (count === 0) {
      console.log('Aviso: Banco de dados vazio. O Seed de MOCK não está mais disponível no código.');
    }
  }

  // Lógica de Busca no Banco de Dados (PERMANECE INALTERADA)
  async findPlaylist(key: string): Promise<Episode[]> {
    return this.episodesRepository.find({
      where: { playlistKey: key.toLowerCase() },
      order: { id: 'ASC' }, 
    });
  }

  // Métodos findAll e findLatest ajustados para retornar o tipo da Entidade (PERMANECEM INALTERADOS)
  findAll(): Episode[] { return []; } 
  findLatest(): Episode { 
    return { 
        id: 0, 
        title: 'Player Vazio', 
        description: '', 
        image: '/images/hipsters-9.svg', 
        link: '#', 
        date: '', 
        // ⚠️ Adicione o playlistKey vazio, pois a Entidade agora exige este campo.
        playlistKey: '' 
    };
  }
}