// aluracast-backend/src/episodes/episodes.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 NOVO
import { Repository } from 'typeorm'; // 👈 NOVO
// ⚠️ MUDANÇA: Importa a Entidade (que é o MOCK de Episode no DB)
import { Episode } from './entities/episode.entity'; 

// ⚠️ MOCK DE DADOS AGORA USADO PARA FAZER O SEED NO BANCO
// Adicionei a propriedade 'playlistKey' em cada objeto.
const EPISODE_DATA_MOCK = {
  'hipsters-ponto-tech': [
    { id: 10, title: 'Github e nossas Funcionalidades Preferidas', description: 'Hipsters Ponto Tech', image: '/images/hipsters-3.svg', link: '#', date: '2023-01-01', playlistKey: 'hipsters-ponto-tech' },
    { id: 11, title: 'Android Jetpack', description: 'Hipsters Ponto Tech', image: '/images/hipsters-4.svg', link: '#', date: '2023-01-02', playlistKey: 'hipsters-ponto-tech' },
    { id: 12, title: 'Softskills em Tech', description: 'Hipsters Ponto Tech', image: '/images/hipsters-5.svg', link: '#', date: '2023-01-03', playlistKey: 'hipsters-ponto-tech' },
    { id: 13, title: 'Educação em Dados e Machine Learning', description: 'Hipsters Ponto Tech', image: '/images/hipsters-6.svg', link: '#', date: '2023-01-04', playlistKey: 'hipsters-ponto-tech' },
    { id: 14, title: 'Ecossistema Crypto', description: 'Hipsters Ponto Tech', image: '/images/hipsters-7.svg', link: '#', date: '2023-01-05', playlistKey: 'hipsters-ponto-tech' },
    { id: 15, title: 'Educação, Tecnologia e Periferia', description: 'Hipsters Ponto Tech', image: '/images/hipsters-8.svg', link: '#', date: '2023-01-06', playlistKey: 'hipsters-ponto-tech' },
  ],
  'indicados-para-voce': [
    { id: 20, title: 'Montando seu estúdio', description: 'Layers Ponto Tech', image: '/images/layers-2.svg', link: '#', date: '2023-02-01', playlistKey: 'indicados-para-voce' },
    { id: 21, title: 'Voltando ao mercado após a maternidade', description: 'Scuba Ponto Dev', image: '/images/scuba-2.svg', link: '#', date: '2023-02-02', playlistKey: 'indicados-para-voce' },
    { id: 22, title: 'Reencontrando a paixão por programar', description: 'Scuba Ponto Dev', image: '/images/scuba-3.svg', link: '#', date: '2023-02-03', playlistKey: 'indicados-para-voce' },
    { id: 23, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-1.svg', link: '#', date: '2023-02-04', playlistKey: 'indicados-para-voce' },
    { id: 24, title: 'Prospecção de clientes', description: 'Layers Ponto Tech', image: '/images/layers-3.svg', link: '#', date: '2023-02-05', playlistKey: 'indicados-para-voce' },
    { id: 25, title: 'Mariana Vasconcelos: CEO Agrosmart', description: 'Like a Boss', image: '/images/boss-2.svg', link: '#', date: '2023-02-06', playlistKey: 'indicados-para-voce' },
  ],
  'dev-sem-fronteiras': [
    { id: 30, title: 'Vida e Trabalho da Costa leste', description: 'Dev sem Fronteiras', image: '/images/fronteiras-2.svg', link: '#', date: '2023-03-01', playlistKey: 'dev-sem-fronteiras' },
    { id: 31, title: 'Agile Coach e Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-3.svg', link: '#', date: '2023-03-02', playlistKey: 'dev-sem-fronteiras' },
    { id: 32, title: 'Desenvolvedor', description: 'Dev sem Fronteiras', image: '/images/fronteiras-4.svg', link: '#', date: '2023-03-03', playlistKey: 'dev-sem-fronteiras' },
    { id: 33, title: 'Suporte UX/UI', description: 'Dev sem Fronteiras', image: '/images/fronteiras-5.svg', link: '#', date: '2023-03-04', playlistKey: 'dev-sem-fronteiras' },
    { id: 34, title: 'Engenheiro de Algoritmos', description: 'Dev sem Fronteiras', image: '/images/fronteiras-6.svg', link: '#', date: '2023-03-05', playlistKey: 'dev-sem-fronteiras' },
    { id: 35, title: 'Engenheiro de Software', description: 'Dev sem Fronteiras', image: '/images/fronteiras-7.svg', link: '#', date: '2023-03-06', playlistKey: 'dev-sem-fronteiras' },
  ],
};


@Injectable()
export class EpisodesService implements OnModuleInit {
  // 👈 NOVO: Implementa OnModuleInit

  constructor(
    @InjectRepository(Episode)
    // 👈 NOVO: Injeta o repositório TypeORM
    private episodesRepository: Repository<Episode>, 
  ) {}

  // ⚠️ NOVO: Método de SEED (Rodará na primeira inicialização)
  async onModuleInit() {
    // Conta quantos episódios existem no banco
    const count = await this.episodesRepository.count();
    
    // Insere os dados apenas se o banco estiver vazio
    if (count === 0) {
      console.log('Banco de dados vazio. Iniciando o Seed...');
      
      // Concatena todos os episódios em um único array para inserção
      const allEpisodes = [
        ...EPISODE_DATA_MOCK['hipsters-ponto-tech'],
        ...EPISODE_DATA_MOCK['indicados-para-voce'],
        ...EPISODE_DATA_MOCK['dev-sem-fronteiras'],
      ];

      // Salva no MySQL
      await this.episodesRepository.save(allEpisodes);
      console.log('Seed concluído. Dados inseridos no MySQL.');
    }
  }

  // ⚠️ ATUALIZADO: Lógica de Busca no Banco de Dados (Substitui o MOCK)
  async findPlaylist(key: string): Promise<Episode[]> {
    // Usa o repositório TypeORM para buscar no banco de dados.
    return this.episodesRepository.find({
      where: { playlistKey: key.toLowerCase() }, // Filtra pelo playlistKey
      order: { id: 'ASC' }, 
    });
  }

  // Métodos findAll e findLatest ajustados para retornar o tipo da Entidade
  findAll(): Episode[] { return []; } 
  findLatest(): Episode { 
    // Você pode melhorar este método para buscar o último no DB!
    return { id: 0, title: 'Player Vazio', description: '', image: '/images/hipsters-9.svg', link: '#', date: '', playlistKey: '' };
  }
}