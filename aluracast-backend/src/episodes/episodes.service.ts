// src/episodes/episodes.service.ts (FINAL E MINIMALISTA)

import { Injectable } from '@nestjs/common';
import { Episode } from './interfaces/episode.interface';

@Injectable()
export class EpisodesService {
  
  // MOCK DE DADOS - PLAYLISTS (O ÚNICO ARRAY DE DADOS REAIS DO APP)
  private readonly playlists: { [key: string]: Episode[] } = {
    // 1. HIPSTERS PONTO TECH
    'hipsters-ponto-tech': [
      { id: 10, title: 'Github e nossas Funcionalidades Preferidas', description: 'Hipsters Ponto Tech', image: '/images/hipsters-3.svg', link: '#', date: '2023-01-01' },
      { id: 11, title: 'Android Jetpack', description: 'Hipsters Ponto Tech', image: '/images/hipsters-4.svg', link: '#', date: '2023-01-02' },
      { id: 12, title: 'Softskills em Tech', description: 'Hipsters Ponto Tech', image: '/images/hipsters-5.svg', link: '#', date: '2023-01-03' },
      { id: 13, title: 'Educação em Dados e Machine Learning', description: 'Hipsters Ponto Tech', image: '/images/hipsters-6.svg', link: '#', date: '2023-01-04' },
      { id: 14, title: 'Ecossistema Crypto', description: 'Hipsters Ponto Tech', image: '/images/hipsters-7.svg', link: '#', date: '2023-01-05' },
      { id: 15, title: 'Educação, Tecnologia e Periferia', description: 'Hipsters Ponto Tech', image: '/images/hipsters-8.svg', link: '#', date: '2023-01-06' },
    ],
    // 2. INDICADOS PARA VOCÊ
    'indicados-para-voce': [
      { id: 20, title: 'Montando seu estúdio', description: 'Layers Ponto Tech', image: '/images/layers-2.svg', link: '#', date: '2023-02-01' },
      { id: 21, title: 'Voltando ao mercado após a maternidade', description: 'Scuba Ponto Dev', image: '/images/scuba-2.svg', link: '#', date: '2023-02-02' },
      { id: 22, title: 'Reencontrando a paixão por programar', description: 'Scuba Ponto Dev', image: '/images/scuba-3.svg', link: '#', date: '2023-02-03' },
      { id: 23, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-1.svg', link: '#', date: '2023-02-04' },
      { id: 24, title: 'Prospecção de clientes', description: 'Layers Ponto Tech', image: '/images/layers-3.svg', link: '#', date: '2023-02-05' },
      { id: 25, title: 'Mariana Vasconcelos: CEO Agrosmart', description: 'Like a Boss', image: '/images/boss-2.svg', link: '#', date: '2023-02-06' },
    ],
    // 3. DEV SEM FRONTEIRAS
    'dev-sem-fronteiras': [
      { id: 30, title: 'Vida e Trabalho da Costa leste', description: 'Dev sem Fronteiras', image: '/images/fronteiras-2.svg', link: '#', date: '2023-03-01' },
      { id: 31, title: 'Agile Coach e Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-3.svg', link: '#', date: '2023-03-02' },
      { id: 32, title: 'Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-4.svg', link: '#', date: '2023-03-03' },
      { id: 33, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-5.svg', link: '#', date: '2023-03-04' },
      { id: 34, title: 'Engenheiro de Algoritmos', description: 'Dev sem Fronteiras', image: '/images/fronteiras-6.svg', link: '#', date: '2023-03-05' },
      { id: 35, title: 'Engenheiro de Software', description: 'Dev sem Fronteiras', image: '/images/fronteiras-7.svg', link: '#', date: '2023-03-06' },
    ],
  };

  // 1. Rota /episodes: Retorna array vazio
  findAll(): Episode[] {
    return []; 
  }

  // 2. Rota /episodes/latest: Agora retorna um objeto vazio para não quebrar a tipagem do Nest.js
  // (Embora o frontend não vá mais usar essa rota)
  findLatest(): Episode {
    return { id: 0, title: 'Player Vazio', description: '', image: '/images/hipsters-9.svg', link: '#', date: '' };
  }
  
  // 3. Rota /episodes/playlists/:key: Retorna a playlist
  findPlaylist(key: string): Episode[] {
    return this.playlists[key.toLowerCase()] || [];
  }
}