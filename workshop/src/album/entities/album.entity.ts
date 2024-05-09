import { Artist } from 'src/artist/entities/artist.entity';
import { Song } from 'src/song/entities/song.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artistId: number;

  @Column()
  genre: string;

  @Column()
  year: string;

  @Column()
  numberOfSales: number;

  @Column(`text`, {
    array: true,
    default: [],
    nullable: true,
  })
  tracks: Song[];

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @ManyToMany(() => Song, (song) => song.album)
  @JoinTable()
  song: Song;
}
