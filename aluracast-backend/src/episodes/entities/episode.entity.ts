// aluracast-backend/src/episodes/episode.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('episode') define que esta classe mapeia a tabela chamada 'episode'
@Entity('episode') 
export class Episode {
  @PrimaryGeneratedColumn()
  id: number; // Chave primária e autoincremento (será gerado pelo MySQL)

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 255 })
  image: string; // Ex: /images/hipsters-3.svg

  @Column({ length: 255 })
  link: string; // O link de reprodução

  @Column({ length: 50 })
  date: string; // Data de lançamento

  @Column({ length: 50 })
  playlistKey: string; // Ex: 'hipsters-ponto-tech' (Usado para buscar a playlist)
}