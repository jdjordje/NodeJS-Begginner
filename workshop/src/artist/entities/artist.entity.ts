import { Album } from 'src/album/entities/album.entity';
import { Song } from 'src/song/entities/song.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  stageName: string;

  @Column()
  age: number;

  @OneToMany(() => Song, (songs) => songs.artist)
  songs: Song[];

  @OneToMany(() => Album, (albums) => albums.artist)
  albums: Album[];
}
