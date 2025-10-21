// aluracast-backend/src/episodes/dto/update-episode.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';

// Permite que todos os campos sejam opcionais na atualização
export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}