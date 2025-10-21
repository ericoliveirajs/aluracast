import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('episode')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 255 })
  image: string;
  @Column({ length: 255 })
  link: string;

  @Column({ length: 50 })
  playlistKey: string;

  @Column({ type: 'date', nullable: true })
  date: string;
}