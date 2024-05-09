import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  duration: number;
  @Column()
  year: string;
  @Column({ nullable: true })
  artistId: number;
  @Column()
  genre: string;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  @JoinColumn({ name: `artistId` })
  artist: Artist;

  @ManyToMany(() => Album, (album) => album.song)
  album: Album;
}
