import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]) 
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}