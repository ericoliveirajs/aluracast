// aluracast-backend/src/episodes/dto/create-episode.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  playlistKey: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}