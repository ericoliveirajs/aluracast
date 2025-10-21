import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity'; 

@Injectable()
export class EpisodesService implements OnModuleInit {

  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>, 
  ) {}

  async onModuleInit() {
    const count = await this.episodesRepository.count();
    
    if (count === 0) {
      console.log('Aviso: Banco de dados vazio. O Seed de MOCK não está mais disponível no código.');
    }
  }

  async findPlaylist(key: string): Promise<Episode[]> {
    return this.episodesRepository.find({
      where: { playlistKey: key.toLowerCase() },
      order: { id: 'ASC' }, 
    });
  }

  findAll(): Episode[] { return []; } 
  findLatest(): Episode { 
    return { 
        id: 0, 
        title: 'Player Vazio', 
        description: '', 
        image: '/images/hipsters-9.svg', 
        link: '#', 
        date: '', 
        playlistKey: '' 
    };
  }
}