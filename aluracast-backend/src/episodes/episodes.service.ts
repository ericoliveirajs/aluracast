import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService implements OnModuleInit {

    private readonly logger = new Logger(EpisodesService.name);

    constructor(
        @InjectRepository(Episode)
        private episodeRepository: Repository<Episode>,
    ) { }

    // --- FUNÇÃO DE SEEDING (OnModuleInit) ---
    async onModuleInit() {
        this.logger.log('Verificando se o banco de dados precisa de seeding...');

        const count = await this.episodeRepository.count();

        if (count === 0) {
            this.logger.warn('Banco de dados de episódios vazio. Iniciando o seeding...');

            // Dados extraídos do seu HTML mockado original
            const mockEpisodes = [
                // --- Hipsters Ponto Tech (4) ---
                {
                    title: 'Github e nossas Funcionalidades Preferidas',
                    description: 'Hipsters Ponto Tech',
                    // ATENÇÃO: Garanta que esta imagem exista em 'aluracast-backend/public/images/'
                    image: '/images/hipsters-3.svg',
                    link: '#',
                    date: '2025-11-06',
                    playlistKey: 'hipsters-ponto-tech',
                },
                {
                    title: 'Android Jetpack',
                    description: 'Hipsters Ponto Tech',
                    image: '/images/hipsters-4.svg',
                    link: '#',
                    date: '2025-11-05',
                    playlistKey: 'hipsters-ponto-tech',
                },
                {
                    title: 'Softskills em Tech',
                    description: 'Hipsters Ponto Tech',
                    image: '/images/hipsters-5.svg',
                    link: '#',
                    date: '2025-11-04',
                    playlistKey: 'hipsters-ponto-tech',
                },
                {
                    title: 'Educação em Dados e Machine Learning',
                    description: 'Hipsters Ponto Tech',
                    image: '/images/hipsters-6.svg',
                    link: '#',
                    date: '2025-11-03',
                    playlistKey: 'hipsters-ponto-tech',
                },

                // --- Indicados para você (4) ---
                {
                    title: 'Montando seu estúdio',
                    description: 'Layers Ponto Tech',
                    image: '/images/layers-2.svg',
                    link: '#',
                    date: '2025-11-06',
                    playlistKey: 'indicados-para-voce',
                },
                {
                    title: 'Voltando ao mercado após a maternidade',
                    description: 'Scuba Ponto Dev',
                    image: '/images/scuba-2.svg',
                    link: '#',
                    date: '2025-11-05',
                    playlistKey: 'indicados-para-voce',
                },
                {
                    title: 'Reencontrando a paixão por programar',
                    description: 'Scuba Ponto Dev',
                    image: '/images/scuba-3.svg',
                    link: '#',
                    date: '2025-11-04',
                    playlistKey: 'indicados-para-voce',
                },
                {
                    title: 'Mariana Vasconcelos: CEO Agrosmart',
                    description: 'Like a Boss',
                    image: '/images/boss-2.svg',
                    link: '#',
                    date: '2025-11-03',
                    playlistKey: 'indicados-para-voce',
                },

                // --- Dev sem Fronteiras (4) ---
                {
                    title: 'Vida e Trabalho da Costa leste',
                    description: 'Dev sem Fronteiras',
                    image: '/images/fronteiras-2.svg',
                    link: '#',
                    date: '2025-11-06',
                    playlistKey: 'dev-sem-fronteiras',
                },
                {
                    title: 'Agile Coach e Desenvolvedor',
                    description: 'Dev sem Fronteiras',
                    image: '/images/fronteiras-3.svg',
                    link: '#',
                    date: '2025-11-05',
                    playlistKey: 'dev-sem-fronteiras',
                },
                {
                    title: 'Desenvolvedor',
                    description: 'Dev sem Fronteiras',
                    image: '/images/fronteiras-4.svg',
                    link: '#',
                    date: '2025-11-04',
                    playlistKey: 'dev-sem-fronteiras',
                },
                {
                    title: 'Suporte UX/UI',
                    description: 'Dev sem Fronteiras',
                    image: '/images/fronteiras-5.svg',
                    link: '#',
                    date: '2025-11-03',
                    playlistKey: 'dev-sem-fronteiras',
                },
            ];

            await this.episodeRepository.save(mockEpisodes);
            this.logger.log('Seeding de 12 episódios concluído com sucesso!');
        } else {
            this.logger.log('Banco de dados já contém dados. Seeding não é necessário.');
        }
    }
    // --- FIM DO SEEDING ---


    // --- O RESTO DO SEU CÓDIGO (CRUD) ---

    async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
        const newEpisode = this.episodeRepository.create(createEpisodeDto);
        return this.episodeRepository.save(newEpisode);
    }

    async findAll(): Promise<Episode[]> {
        return this.episodeRepository.find();
    }

    async findLatest(): Promise<Episode> {
        const latest = await this.episodeRepository.findOne({
            order: { date: 'DESC' },
        });

        if (!latest) {
            return {
                id: 0,
                title: 'Player Vazio',
                description: '',
                image: '/images/hipsters-9.svg',
                link: '#',
                date: '',
                playlistKey: ''
            } as Episode;
        }
        return latest;
    }

    async findPlaylist(key: string): Promise<Episode[]> {
        return this.episodeRepository.find({
            where: { playlistKey: key.toLowerCase() },
            order: { date: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Episode> {
        const episode = await this.episodeRepository.findOneBy({ id });
        if (!episode) {
            throw new NotFoundException(`Episódio com ID ${id} não encontrado.`);
        }
        return episode;
    }

    async update(id: number, updateEpisodeDto: UpdateEpisodeDto): Promise<Episode> {
        const episode = await this.findOne(id);
        this.episodeRepository.merge(episode, updateEpisodeDto);
        return this.episodeRepository.save(episode);
    }

    async remove(id: number) {
        const result = await this.episodeRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Episódio com ID ${id} não encontrado.`);
        }
        return { message: `Episódio #${id} removido com sucesso.` };
    }
}