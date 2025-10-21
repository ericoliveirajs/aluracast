// aluracast-backend/src/episodes/episodes.service.ts

import { Injectable } from '@nestjs/common';
import { Episode } from './interfaces/episode.interface';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {

  private readonly playlists: { [key: string]: Episode[] } = {
    'hipsters-ponto-tech': [
      { id: 10, title: 'Github e nossas Funcionalidades Preferidas', description: 'Hipsters Ponto Tech', image: '/images/hipsters-3.svg', link: '#', date: '2023-01-01' },
      { id: 11, title: 'Android Jetpack', description: 'Hipsters Ponto Tech', image: '/images/hipsters-4.svg', link: '#', date: '2023-01-02' },
      { id: 12, title: 'Softskills em Tech', description: 'Hipsters Ponto Tech', image: '/images/hipsters-5.svg', link: '#', date: '2023-01-03' },
      { id: 13, title: 'Educação em Dados e Machine Learning', description: 'Hipsters Ponto Tech', image: '/images/hipsters-6.svg', link: '#', date: '2023-01-04' },
      { id: 14, title: 'Ecossistema Crypto', description: 'Hipsters Ponto Tech', image: '/images/hipsters-7.svg', link: '#', date: '2023-01-05' },
      { id: 15, title: 'Educação, Tecnologia e Periferia', description: 'Hipsters Ponto Tech', image: '/images/hipsters-8.svg', link: '#', date: '2023-01-06' },
    ],
    'indicados-para-voce': [
      { id: 20, title: 'Montando seu estúdio', description: 'Layers Ponto Tech', image: '/images/layers-2.svg', link: '#', date: '2023-02-01' },
      { id: 21, title: 'Voltando ao mercado após a maternidade', description: 'Scuba Ponto Dev', image: '/images/scuba-2.svg', link: '#', date: '2023-02-02' },
      { id: 22, title: 'Reencontrando a paixão por programar', description: 'Scuba Ponto Dev', image: '/images/scuba-3.svg', link: '#', date: '2023-02-03' },
      { id: 23, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-1.svg', link: '#', date: '2023-02-04' },
      { id: 24, title: 'Prospecção de clientes', description: 'Layers Ponto Tech', image: '/images/layers-3.svg', link: '#', date: '2023-02-05' },
      { id: 25, title: 'Mariana Vasconcelos: CEO Agrosmart', description: 'Like a Boss', image: '/images/boss-2.svg', link: '#', date: '2023-02-06' },
    ],
    'dev-sem-fronteiras': [
      { id: 30, title: 'Vida e Trabalho da Costa leste', description: 'Dev sem Fronteiras', image: '/images/fronteiras-2.svg', link: '#', date: '2023-03-01' },
      { id: 31, title: 'Agile Coach e Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-3.svg', link: '#', date: '2023-03-02' },
      { id: 32, title: 'Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-4.svg', link: '#', date: '2023-03-03' },
      { id: 33, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-5.svg', link: '#', date: '2023-03-04' },
      { id: 34, title: 'Engenheiro de Algoritmos', description: 'Dev sem Fronteiras', image: '/images/fronteiras-6.svg', link: '#', date: '2023-03-05' },
      { id: 35, title: 'Engenheiro de Software', description: 'Dev sem Fronteiras', image: '/images/fronteiras-7.svg', link: '#', date: '2023-03-06' },
    ],
  };

  // ---------------------------------------------
  // MÉTODOS EXISTENTES (GET)
  // ---------------------------------------------

  findAll(): Episode[] {
    const allEpisodes = Object.values(this.playlists).flat();
    return allEpisodes;
  }

  findLatest(): Episode {
    return { id: 0, title: 'Player Vazio', description: '', image: '/images/hipsters-9.svg', link: '#', date: '' };
  }

  findPlaylist(key: string): Episode[] {
    return this.playlists[key.toLowerCase()] || [];
  }

  // ---------------------------------------------
  // NOVOS MÉTODOS (CRUD)
  // ---------------------------------------------

  create(createEpisodeDto: CreateEpisodeDto): Episode {
    // Simulação de criação com valores padrão para 'image' e 'link'
    const newEpisode = {
      id: Math.floor(Math.random() * 1000) + 1,
      date: new Date().toISOString().split('T')[0],
      image: '/images/simulado.svg', // Adicionado para satisfazer a interface Episode
      link: '#',                       // Adicionado para satisfazer a interface Episode
      ...createEpisodeDto,
    } as Episode;

    return newEpisode;
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto): Episode {
    // Simulação de busca e atualização
    const existingEpisode = {
      id,
      title: 'Título Simulado Antigo',
      description: 'Descrição Antiga',
      playlistKey: 'hipsters-ponto-tech',
      link: '#',
      image: '/images/simulado.svg',
      date: '2023-01-01',
    } as Episode;

    return { ...existingEpisode, ...updateEpisodeDto };
  }

  remove(id: number) {
    // Simulação de remoção
    return { id, message: `Episódio #${id} removido com sucesso.` };
  }
}