import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';                 
import { Episode } from './entities/episode.entity';   
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';


@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(Episode)
        private episodeRepository: Repository<Episode>,
    ) {}

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